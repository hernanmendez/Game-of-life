 //compiled with babeljs.io
    'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            width: 40, height: 40,
            generation: 1, cells: undefined
        };return _this;
    }

    _createClass(App, [{
        key: 'change',
        value: function change() {
            var _this2 = this;

            var changes = [];
            for (var i = 0; i < this.state.height; i++) {
                changes.push([]);
            }for (var CellN = 1; CellN <= this.state.height * this.state.width; CellN++) {
                var subIndex = CellN % this.state.width - 1;
                if (subIndex < 0) subIndex = this.state.width - 1;
                var index = Math.ceil(CellN / this.state.width) - 1;
                var neighbors = [];
                for (var _i = -1; _i < 2; _i++) {
                    neighbors.push([index + _i, subIndex - 1]);
                    neighbors.push([index + _i, subIndex]);
                    neighbors.push([index + _i, subIndex + 1]);
                }
                neighbors.splice(4, 1);
                neighbors = neighbors.filter(function (x) {
                    return x[0] > -1 && x[0] < _this2.state.height && x[1] > -1 && x[1] < _this2.state.width;
                }).map(function (x) {
                    return _this2.state.cells[x[0]][x[1]];
                }).filter(function (x) {
                    return x[2];
                });
                for (var _i2 = 0; _i2 < this.state.height; _i2++) {
                    if (changes[_i2].length < this.state.width) {
                        if (this.state.cells[index][subIndex][2]) {
                            if (neighbors.length == 2 || neighbors.length == 3) changes[_i2].push([index + 1, subIndex + 1, true]);else changes[_i2].push([index + 1, subIndex + 1, false]);
                        } else {
                            if (neighbors.length == 3) changes[_i2].push([index + 1, subIndex + 1, true]);else changes[_i2].push([index + 1, subIndex + 1, false]);
                        }

                        break;
                    }
                }
            }
            this.setState({ cells: changes, generation: this.state.generation + 1 });
        }
    }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
            var Cells = [];
            for (var row = 1; row <= this.state.height; row++) {
                var r = [];
                for (var col = 1; col <= this.state.width; col++) {
                    r.push([row, col, false]);
                }
                Cells.push(r);
            }
            var randomnums = [];
            for (var i = 0; i < 1200; i++) {
                randomnums.push(Math.floor(Math.random() * 1600) + 1);
            }
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = randomnums[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var num = _step.value;

                    Cells[Math.ceil(num / 40) - 1][num % 40][2] = true;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.setState({ cells: Cells });
            this.interval = setInterval(this.change.bind(this), 100);
        }
    }, {
        key: 'setSpeed',
        value: function setSpeed(speed) {
            if (typeof this.interval != 'undefined') clearInterval(this.interval);
            switch (speed) {
                case 'Slow':
                    this.interval = setInterval(this.change.bind(this), 300);
                    break;
                case 'Normal':
                    this.interval = setInterval(this.change.bind(this), 100);
                    break;
                case 'Fast':
                    this.interval = setInterval(this.change.bind(this), 50);
                    break;
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            clearInterval(this.interval);

            var Cells = [];
            for (var row = 1; row <= this.state.height; row++) {
                var r = [];
                for (var col = 1; col <= this.state.width; col++) {
                    r.push([row, col, false]);
                }
                Cells.push(r);
            }

            this.setState({ cells: Cells, generation: 1 });
        }
    }, {
        key: 'pause',
        value: function pause() {
            clearInterval(this.interval);
        }
    }, {
        key: 'set',
        value: function set() {
            if (document.getElementById('width').value != '' && document.getElementById('height').value != '' && document.getElementById('width').value > -1 && document.getElementById('height').value > -1) {
                var width = document.getElementById('width').value;
                var height = document.getElementById('height').value;
                this.setState({
                    width: document.getElementById('width').value,
                    height: document.getElementById('height').value
                });
                document.getElementById('width').value = '';
                document.getElementById('height').value = '';

                var Cells = [];
                for (var row = 1; row <= height; row++) {
                    var r = [];
                    for (var col = 1; col <= width; col++) {
                        r.push([row, col, false]);
                    }
                    Cells.push(r);
                }

                this.setState({ cells: Cells });
                if (typeof this.interval != 'undefined') clearInterval(this.interval);
                this.setState({ generation: 1 });
            }
        }
    }, {
        key: 'toggle',
        value: function toggle(index, subIndex) {
            var cells = JSON.parse(JSON.stringify(this.state.cells));cells[index][subIndex][2] = !cells[index][subIndex][2];this.setState({ cells: cells });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            return React.createElement(
                'div',
                null,
                React.createElement(
                    'div',
                    { className: 'controls' },
                    React.createElement(
                        'span',
                        null,
                        'Width: '
                    ),
                    React.createElement('input', { type: 'number', id: 'width' }),
                    React.createElement('br', null),
                    React.createElement(
                        'span',
                        null,
                        'height: '
                    ),
                    React.createElement('input', { type: 'number', id: 'height' }),
                    React.createElement('br', null),
                    React.createElement(
                        'button',
                        { onClick: this.set.bind(this) },
                        'Set dimensions'
                    ),
                    React.createElement(
                        'div',
                        { className: 'center' },
                        React.createElement(
                            'span',
                            null,
                            'Speed:'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.setSpeed.bind(this, 'Slow') },
                            'Slow'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.setSpeed.bind(this, 'Normal') },
                            'Normal'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.setSpeed.bind(this, 'Fast') },
                            'Fast'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.pause.bind(this) },
                            'Pause'
                        ),
                        React.createElement(
                            'button',
                            { onClick: this.reset.bind(this) },
                            'Reset'
                        )
                    )
                ),
                React.createElement(
                    'p',
                    null,
                    'Generation: ',
                    this.state.generation
                ),
                React.createElement(
                    'div',
                    { className: 'table', style: { width: this.state.width * 0.4 + 'cm' } },
                    this.state.cells.map(function (inf, index) {
                        var cells = inf.map(function (info, i) {
                            return React.createElement('div', { className: info[2] ? 'alive' : 'dead', key: info[0].toString() + info[1].toString(), onClick: _this3.toggle.bind(_this3, index, i) });
                        });
                        return React.createElement(
                            'div',
                            { key: index, style: { width: _this3.state.width * 0.4 + 'cm' } },
                            cells
                        );
                    })
                ),
                React.createElement('div', { className: 'patterns' })
            );
        }
    }]);

    return App;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));