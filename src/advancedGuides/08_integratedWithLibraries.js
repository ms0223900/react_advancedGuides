import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
// import Backbone from 'backbone';
// import chosen from 'chosen-js';

// class Chosen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       $el: null, 
//     }
//   }
//   componentDidMount() {
//     this.$el = $(this.el);
//     this.$el.chosen();

//     this.handleChange = this.handleChange.bind(this);
//     this.$el.on('change', this.handleChange);
//   }
  
//   componentDidUpdate(prevProps) { 此方法來檢查更新他的值ｓ
//     if (prevProps.children !== this.props.children) {
//       this.$el.trigger("chosen:updated");
//     }
//   }

//   componentWillUnmount() {
//     this.$el.off('change', this.handleChange);
//     this.$el.chosen('destroy');
//   }
  
//   handleChange(e) {
//     this.props.onChange(e.target.value);
//   }

//   render() {
//     return (
//       <div>
//         <select className="Chosen-select" ref={el => this.el = el}>
//           {this.props.children}
//         </select>
//       </div>
//     );
//   }
// }

// function Example() {
//   return (
//     <Chosen onChange={value => console.log(value)}>
//       <option>vanilla</option>
//       <option>chocolate</option>
//       <option>strawberry</option>
//     </Chosen>
//   );
// }

function HelloButton() {
  return <button id="btn">Say Hello</button>;
}


class Item extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.model.on('change', this.handleChange);
  }

  componentWillUnmount() {
    this.props.model.off('change', this.handleChange);
  }

  render() {
    return <li>{this.props.model.get('text')}</li>;
  }
}

class List extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange();
  }

  handleChange() {
    this.forceUpdate();
  }

  componentDidMount() {
    this.props.collection.on('add', 'remove', this.handleChange);
  }

  componentWillUnmount() {
    this.props.collection.off('add', 'remove', this.handleChange);
  }

  render() {
    return (
      <ul>
        {this.props.collection.map(model => (
          <Item key={model.cid} model={model} />
        ))}
      </ul>
    );
  }
}

// const collection = new Backbone.Collection([
//   new Backbone.Model({ text: 'A' }),
//   new Backbone.Model({ text: 'B' }),
//   new Backbone.Model({ text: 'C' })
// ]);



function connectToBackboneModel(WrappedComponent) {
  return class BackboneComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {...props.model.attributes}; //複製到React組件的值
    }

    componentDidMount() {
      this.props.model.on('change', this.handleChange);
    }
    componentWillReceiveProps(nextProps) {
      this.setState(Object.assign({}, nextProps.model.attributes)); //update
      if(nextProps.model !== this.props.model) {
        this.props.model.off('change', this.handleChange);
        nextProps.model.on('change', this.handleChange); 
      }
    }
    componentWillUnmount() {
      this.props.model.off('change', this.handleChange);
    }

    handleChange = (model) => {
      this.setState(model.changedAttributes());
    }

    render() {
      const propsExceptModel = {...this.props};
      delete propsExceptModel.model;
      return <WrappedComponent {...propsExceptModel} {...this.state} />
    }
  }
}

function NameInput(props) {
  return (
    <p>
      <input value={props.firstName} onChange={props.handleChange}/>
      <br />
      My name is {props.firstName}.
    </p>
  );
}

const BackboneNameInput = connectToBackboneModel(NameInput);

function Example(props) {
  function handleChange(e) {
    props.model.set('firstName', e.target.value);
  }
  return(
    <BackboneNameInput
      model={props.model}
      handleChange={handleChange} />
  );
}

// const model = new Backbone.Model({firstName: 'Freddo'});



export default HelloButton;
// export { List, collection, Example };


