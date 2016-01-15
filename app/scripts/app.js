/** @jsx React.DOM */
'use strict';
// 事件
var HelloWorld = React.createClass({displayName: 'HelloWorld',
	getInitialState: function() {
		return {message: 'Hello World!'};
	},
	goodbye: function(event) {
		this.setState({message: 'Goodbye World.'});
	},
	render: function() {
		return (
			React.DOM.h1( {onClick:this.goodbye}, this.state.message)
		);
	}
});
// 组件
var app = React.createClass({displayName: 'app',

	render: function() {
		return (
			React.DOM.span(null, "App")
		);
	}

});
// 样式
var EzLampComp = React.createClass({displayName: 'EzLampComp',
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
		return React.DOM.span( {className:"ez-lamp", style:style});  //JSX
	}
});
// 定时器
var timer = React.createClass({displayName: 'timer',
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
        return React.DOM.h2( {onClick:this.handleClick}, "time ", this.state.clickCount);
    }
});
// Today
var TodoList = React.createClass({displayName: 'TodoList',
    render: function() {
    	var creatItem = function (itemText){
    		return React.DOM.li(null, itemText)
    	};
        return (
            React.DOM.ul(null, this.props.items.map(creatItem))
        );
    }
});

var Today = React.createClass({displayName: 'Today',
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
            React.DOM.div(null, 
            	React.DOM.h3(null, "Todo"),
            	TodoList( {items:this.state.items} ),
            	React.DOM.form( {onSubmit:this.handleSubmit}, 
            		React.DOM.input( {type:"text", onChange:this.handleChange, value:this.state.text, ref:"input"} ),
            		React.DOM.button(null, 'add #' + (this.state.items.length + 1))
            	)
            )
        );
    }
});
// 双向数据绑定
var databind = React.createClass({displayName: 'databind',
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
            React.DOM.div(null, 
            	React.DOM.h3(null, "input"),
            	React.DOM.textarea( {onChange:this.handleChange, ref:"textarea", defaultValue:this.state.text}),
            	React.DOM.h4(null, "Output"),
            	React.DOM.p(null, this.state.text)
            )
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
var clockCom = React.createClass({displayName: 'clockCom',
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
            React.DOM.div( {className:"clock", style:style}, 
            	this.state.time
            )
        );
    }
});
// 容器组件
var pane = React.createClass({displayName: 'pane',
	componentDidMount: function() {
		// console.log(this.props.children);
	},
    render: function() {
        return (
            React.DOM.div(null, 
            	this.props.title,
            	this.props.children
            )
        );
    }
});
// css3动画
var css3 = React.createClass({displayName: 'css3',
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
            React.DOM.div( {className:"ez-gauge", onClick:this.handleClick}, 
            	React.DOM.img( {src:"images/gauge.jpg", alt:""}),
            	React.DOM.img( {src:"images/gauge-pointer.jpg", ref:"image", className:"pointer", style:style} )
            )
        );
    }
});
// 获取DOM节点的值，refs
var refNode = React.createClass({displayName: 'refNode',
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
        	React.DOM.form( {onSubmit:this.handleSubmit, className:  "ez-login"}, 
				React.DOM.div( {className:"row title"}, 
					React.DOM.h1(null, "登录")
				),
				React.DOM.div( {className:"row account"}, 
					React.DOM.label(null, "用户"),
					React.DOM.input( {type:"text", defaultValue:"", placeholder:"请输入用户名", ref:"account"})
				),
				React.DOM.div( {className:"row pass"}, 
					React.DOM.label(null, "密码"),
					React.DOM.input( {type:"password", ref:"password", placeholder:"请输入密码", ref:"password"})
				),
				React.DOM.div( {classNmae:"row"}, 
					React.DOM.select( {defaultValue:"A", ref:"select"}, 
						React.DOM.option( {value:"A"}, "A"),
						React.DOM.option( {value:"B"}, "B"),
						React.DOM.option( {value:"C"}, "C")
					)
				),
				React.DOM.div( {className:"row"}, 
					" A ",
					React.DOM.input( {onChange:this.goodRadio, type:"radio", value:"A", name:"goodRadio", defaultChecked:true}),
					" B ",
					React.DOM.input( {onChange:this.goodRadio, type:"radio", value:"B", name:"goodRadio"}),
					" C ",
					React.DOM.input( {onChange:this.goodRadio, type:"radio", value:"C", name:"goodRadio"})
				),
				React.DOM.div( {className:"remember"}, 
					React.DOM.input( {onChange:this.goodCheck, type:"checkbox", name:"goodCheckbox", value:"0"}),
					" 玩游戏 ",
					React.DOM.input( {onChange:this.goodCheck, type:"checkbox", name:"goodCheckbox", value:"1"}),
					" 泡妞 ",
					React.DOM.input( {onChange:this.goodCheck, type:"checkbox", name:"goodCheckbox", value:"2"}),
					" 上网 "
				),
				React.DOM.div( {className:"row"}),
					React.DOM.textarea( {name:"", defaultValue:this.state.textarea, ref:"textarea"}),
				React.DOM.div( {className:"row button"}, 
					React.DOM.button( {type:"submit"}, "登录")
				)
			)
        );
    }
});

React.renderComponent(
	React.DOM.div(null, 
		HelloWorld(null ),
		app(null ),
		HelloWorld(null ),
		EzLampComp( {color:"green", onoff:"off", onshape:"circle"}),
		EzLampComp( {color:"red", onoff:"off", onshape:"rect"}),
		EzLampComp( {color:"blue", onoff:"off", onshape:"rect"}),
		EzLampComp( {color:"yellow", onoff:"on", onshape:"circle"}),
		timer(null ),
		Today(null ),
		databind(null ),
		clockCom(null ),
		pane( {title:"额额额额"}, React.DOM.p(null, "asdasdasdasda")),
		css3( {value:"200"} ),
		refNode(null )
	),
	document.getElementById('app')
);
