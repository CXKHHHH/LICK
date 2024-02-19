import React from "react";
// import withRouter from "@/component/withRouter";
//类组件不能使用hook
//高阶组件HOC
//一种渲染其他组件的组件src\views.jsx
const FooContext = React.createContext();
const FooChild = () => {
  const data = React.useContext(FooContext);
  console.log("data", data); //接收的数据
  return <div className="bg-black w-[100px] h-[100px]">111111</div>;
};
const Foo = () => {
  console.log(this.props);
  return (
    <div className="bg-black w-[100px] h-[100px]">
      <FooContext.Provider value={{ a: 1, b: 2 }}>
        <FooChild />
      </FooContext.Provider>
    </div>
  );
};
export default Foo;
//全局数据传递共享
//creactContext useContext 类似于vue.js provide和inject
//creactContext+useContext只能向后代传递数据

// const FooCreactext = React.createContext();存
// const foo =React.useContext(FooCreactext)取
//<FooCreactext.provider value={{}}>

/**
 * react 组件
 *
 * 深浅对比
 * 默认情况下组件因props变化导致重新渲染的比较方式是 深对比（对比前后props的引用地址一样）（神形不一样重新渲染）
 * 当使用React.memo进行包裹一个组件的时候 该组件props的对比方式就由深对比变为浅对比
 * 深对比
 * let a = {}
 * let b = {}
 * console.log(a==b)
 *
 * 浅对比
 * let a ={a:1,b:[],c:{}}
 * let b ={a:1,b:[],c:{}}
 * 忽略a和b的内存地址
 * usecallback包裹 (保持函数的应用非不要不更新变)把深对比改为浅对比
 * ref　转发　函数组件有没有组件实例
 * forwodrRef包裹包裹父组件 然后子组件ref.current 赋值后可以在父组件打印获取/6
 * uerMemo(()=>{},[])缓存计算的结果
 *  React.memo
 */

// / js实现一下浅对比
// function shallowEqual(o1, o2) {}

// let a1 = {};
// let a2 = {};
// shallowEqual(a1, a2); // true

// let b1 = { x: 1 };
// let b2 = { x: 2 };
// shallowEqual(b1, b2); // false

// let c1 = { x: 1 };
// let c2 = { x: 1 };
// shallowEqual(c1, c2); // true

// let d1 = { x: 1 };
// let d2 = { x: 1, y: 2 };
// shallowEqual(d1, d2); // false

// let e1 = { x: 1, y: [] };
// let e2 = { x: 1, y: [] };
// shallowEqual(e1, e2); // false

// let y = [];
// let f1 = { x: 1, y };
// let f2 = { x: 1, y };
// shallowEqual(f1, f2); // true
