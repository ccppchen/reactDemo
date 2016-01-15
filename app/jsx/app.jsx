/** @jsx React.DOM */
'use strict';
// 事件
var HelloWorld = React.createClass({
	getInitialState: function() {
		return {message: 'Hello World!'};
	},
	goodbye: function(event) {
		this.setState({message: 'Goodbye World.'});
	},
	render: function() {
		return (
			<h1 onClick={this.goodbye}>{this.state.message}</h1>
		);
	}
});
// 组件
var app = React.createClass({

	render: function() {
		return (
			<span>App</span>
		);
	}

});
// 样式
var EzLampComp = React.createClass({
	render : function(){
		//取得属性值
		var color = this.props.color,
			onoff = this.props.onoff;
		//亮光颜色
		var lights = {
			"off":"#888",
			"on":"#fff"
		};
		//透明度
		var opacity ={
			"off":0.5,
			"on":1.0
		};
		var shape = {
			"rect": "0",
			"circle": "50%"
		};
		//根据属性设置附加的样式
		var style = {
			borderRadius : shape[this.props.onshape],  //对应样式：border-radius
			opacity : opacity[this.props.onoff], 
			background : "-webkit-radial-gradient(30% 30%," + lights[onoff] + " 5%," + color +" 95%)"
		};
		//返回React元素
		return <span className="ez-lamp" style={style}></span>;  //JSX
	}
});
// 定时器
var timer = React.createClass({
    getInitialState: function() {
    	return {
    		clickCount: 0 
    	};
    },
    handleClick: function (){
    	this.setState({
    		clickCount: this.state.clickCount+1
    	});
    },
    componentDidMount: function() {
    	this.interval = setInterval(this.handleClick, 1000);
    },
    componentWillUnmount: function() {
    	clearInterval(this.interval);
    },
    render: function() {
        return <h2 onClick={this.handleClick}>time {this.state.clickCount}</h2>;
    }
});
// Today
var TodoList = React.createClass({
    render: function() {
    	var creatItem = function (itemText){
    		return <li>{itemText}</li>
    	};
        return (
            <ul>{this.props.items.map(creatItem)}</ul>
        );
    }
});

var Today = React.createClass({
	getInitialState: function() {
		return {
			items: [],
			text: '' 
		};
	},
	componentDidMount: function() {
		this.refs.input.getDOMNode().focus();
	},
	handleSubmit: function (e){
		e.preventDefault();
		if (!this.state.text) {
			alert("请输入内容！！！");
		}else if (this.state.items.length > 2){
			alert("最多添加3条");
		}else {
			var newItems = this.state.items.concat(this.state.text);
			var newText = '';
			this.setState({
				items: newItems,
				text: newText 
			});
		};
	},
	handleChange: function (e){
		this.setState({
			text: e.target.value
		});
	},
    render: function() {
        return (
            <div>
            	<h3>Todo</h3>
            	<TodoList items={this.state.items} />
            	<form onSubmit={this.handleSubmit}>
            		<input type="text" onChange={this.handleChange} value={this.state.text} ref="input" />
            		<button>{'add #' + (this.state.items.length + 1)}</button>
            	</form>
            </div>
        );
    }
});
// 双向数据绑定
var databind = React.createClass({
	getInitialState: function() {
		return {
			text: 'Hello World' 
		};
	},
	handleChange: function (){
		this.setState({
			text: this.refs.textarea.getDOMNode().value
			// 找节点
			// componentDidMount: function(){
   //          	React.findDOMNode(this.refs.q).focus();
   //          },
		});
	},
	componentDidMount: function() {
		// this.refs.textarea.getDOMNode().focus();
	},
    render: function() {
        return (
            <div>
            	<h3>input</h3>
            	<textarea onChange={this.handleChange} ref="textarea" defaultValue={this.state.text}></textarea>
            	<h4>Output</h4>
            	<p>{this.state.text}</p>
            </div>
        );
    }
});
// 生命周期，时钟
//获取并格式化当前时间
var _getTime = function(){
	var _=['00','01','02','03','04','05','06','07','08','09'],  //补零
		d = new Date(),
		h = d.getHours(),
		m = d.getMinutes(),
		s = d.getSeconds();
	
	return [_[h]||h,_[m]||m,_[s]||s].join(":");
};
var clockCom = React.createClass({
	getInitialState: function() {
		return {
			time: _getTime(),
			color: '#000' 
		};
	},
	componentDidMount: function() {
		this.timer = setInterval(function (){
			this.setState({
				time: _getTime() 
			});
		}.bind(this), 1000)
	},
	componentWillUnmount: function() {
		clearInterval(this.timer);
	},
	componentWillUpdate: function(nextProps, nextState) {
		if(this.state.time.substring(6,8)%2 == 0){
        	nextState.color = 'red';
        }else{
        	nextState.color = 'green';
        }
	},
    render: function() {
    	var style = {
    		"color": this.state.color
    	};
        return (
            <div className="clock" style={style}>
            	{this.state.time}
            </div>
        );
    }
});
// 容器组件
var pane = React.createClass({
	componentDidMount: function() {
		// console.log(this.props.children);
	},
    render: function() {
        return (
            <div>
            	{this.props.title}
            	{this.props.children}
            </div>
        );
    }
});
// css3动画
var css3 = React.createClass({
	getDefaultProps: function() {
		return {
			value: 200
		};
	},
	getInitialState: function() {
		return {
			value: 0,
			mounted: false
		};
	},
	componentDidMount: function() {
		this.setState({
			mounted: false 
		});
	},
	shouldComponentUpdate: function(nextProps, nextState) {
		if(nextProps.value > 220 || nextProps.value < 0) return false;
		return true;
	},
	handleClick: function (){
		this.setState({
			mounted: !this.state.mounted
		});
	},
    render: function() {
    	// 速度是0时的旋转角度
    	var degree = -201;
    	if (this.state.mounted) {
    		degree = (this.props.value / 220) * 265 - 201;
    		window.getComputedStyle(this.refs.image.getDOMNode()).transform;
    	};

    	//表针样式
		var style={
			transform : "rotate("+degree+"deg)"
		};
        return (
            <div className="ez-gauge" onClick={this.handleClick}>
            	<img src="images/gauge.jpg" alt=""/>
            	<img src="images/gauge-pointer.jpg" ref="image" className="pointer" style={style} />
            </div>
        );
    }
});
// 获取DOM节点的值，refs
var refNode = React.createClass({
	getInitialState: function() {
		return {
			account: '',
			password: '', 
			select: 'A',
			radio: 'A',
			checkbox: [],
			textarea: 'this id textarea!!!'
		};
	},
	handleSubmit: function (e){
		e.preventDefault();
		// console.log(e.native());
		var formDate = {
			account: this.refs['account'].getDOMNode().value,
			password: this.refs['password'].getDOMNode().value,
			select: this.refs['select'].getDOMNode().value,
			radio: this.state.radio,
			checkbox: this.state.checkbox,
			textarea: this.refs['textarea'].getDOMNode().value
		};

		console.log(formDate);
	},
	goodRadio: function (e){
		this.setState({
			radio: e.target.value 
		});
	},
	goodCheck: function (e){
		var checkValue = this.state.checkbox.slice();
		var newVal = e.target.value;
		var index = checkValue.indexOf(newVal);
		if (index == -1) {
			checkValue.push( newVal );
		}else{
			checkValue.splice(index, 1)
		}
		this.setState({
			checkbox: checkValue 
		});
	},
    render: function() {
        return (
        	<form onSubmit={this.handleSubmit} className = "ez-login">
				<div className="row title">
					<h1>登录</h1>
				</div>
				<div className="row account">
					<label>用户</label>
					<input type="text" defaultValue="" placeholder="请输入用户名" ref="account"/>
				</div>
				<div className="row pass">
					<label>密码</label>
					<input type="password" ref="password" placeholder="请输入密码" ref="password"/>
				</div>
				<div classNmae="row">
					<select defaultValue="A" ref="select">
						<option value="A">A</option>
						<option value="B">B</option>
						<option value="C">C</option>
					</select>
				</div>
				<div className="row">
					A
					<input onChange={this.goodRadio} type="radio" value="A" name="goodRadio" defaultChecked/>
					B
					<input onChange={this.goodRadio} type="radio" value="B" name="goodRadio"/>
					C
					<input onChange={this.goodRadio} type="radio" value="C" name="goodRadio"/>
				</div>
				<div className="remember">
					<input onChange={this.goodCheck} type="checkbox" name="goodCheckbox" value="0"/>
					玩游戏
					<input onChange={this.goodCheck} type="checkbox" name="goodCheckbox" value="1"/>
					泡妞
					<input onChange={this.goodCheck} type="checkbox" name="goodCheckbox" value="2"/>
					上网
				</div>
				<div className="row"></div>
					<textarea name="" defaultValue={this.state.textarea} ref="textarea"></textarea>
				<div className="row button">
					<button type="submit">登录</button>
				</div>
			</form>
        );
    }
});

React.renderComponent(
	<div>
		<HelloWorld />
		<app />
		<HelloWorld />
		<EzLampComp color="green" onoff="off" onshape="circle"/>
		<EzLampComp color="red" onoff="off" onshape="rect"/>
		<EzLampComp color="blue" onoff="off" onshape="rect"/>
		<EzLampComp color="yellow" onoff="on" onshape="circle"/>
		<timer />
		<Today />
		<databind />
		<clockCom />
		<pane title="额额额额"><p>asdasdasdasda</p></pane>
		<css3 value="200" />
		<refNode />
	</div>,
	document.getElementById('app')
);
