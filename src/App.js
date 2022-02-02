import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


class Other extends Component{
   constructor(props){
    super(props)
    this.state = {
           qty:0,
           editBox: false
       }
       this.buy= this.buy.bind(this);
       this.show= this.show.bind(this);
       this.delete= this.delete.bind(this);
       this.edit = this.edit.bind(this);
       this.save= this.save.bind(this);
   }
    buy(){
      this.setState({qty: this.state.qty + 1});
      this.props.handleTotal(this.props.price);
    }

    show(){
        this.props.handleShow(this.props.name)
    }
    delete(){
        this.props.handleDelete(this.props.name)
    }
    edit(){
        this.setState({
            editBox:true
        })
    }

    save(e){
        e.preventDefault();
        this.setState({
            editBox:false
        });
        this.props.handleEdit(this.refs.name.value,parseInt(this.refs.price.value),this.props.index);
    }
    render(){
        return(
            <div>
                {this.state.editBox ? <form onSubmit={this.save}>
                <input type="text" placeholder="Product name" ref="name" defaultValue={this.props.name}/>
                <input type="number" placeholder="Product Price" ref="price" defaultValue={this.props.price}/>
                <button>Save</button>
                </form> : <p>{this.props.name} - ${this.props.price}</p> }
                
                <button onClick={this.buy}>Buy</button>
                <button onClick={this.show}>Show</button>
                <button onClick={this.edit}>Edit</button>
                <button onClick={this.delete}>Delete</button>
                <h5>Quantity: {this.state.qty} item(s)</h5>
                <hr />
            </div>
        )
    }
}

class Total extends Component{
   
    render(){
        return(
            <div>
                <h4>Total Cash : ${this.props.total}</h4>
            </div>
        )
    }
}

class ProductForm extends Component{
    constructor(props){
        super(props)
        this.submit= this.submit.bind(this);
        this.increment= this.increment.bind(this);
    }
    increment(i){
        return i++;
    }
    submit(e){
        e.preventDefault();
        if((this.refs.name.value && this.refs.price.value) == ""){
            alert("Fields cant be empty");
        }
        else{
    var product={
        name:this.refs.name.value,
        price:parseInt(this.refs.price.value),
        id: this.increment(parseInt(this.refs.price.value))
    }
    this.props.handleCreate(product);

        this.refs.name.value="";
        this.refs.price.value="";
}
    }
    
    render(){
        return(
            <form onSubmit={this.submit}>
                <input type="text" placeholder="Product name" ref="name" />
                <input type="number" placeholder="Product Price" ref="price" />
                <button disabled={this.ifNoValue}>Add Product</button>
                <hr />
            </form>
          
        )
    }
}

class ProductList extends Component{
    constructor(props){
        super(props)
       this.state= {
           total:0,
           productList: [
               {name:"Android",price:133,id:1},
               {name:"Ios",price:178,id:2},
               {name:"Windows",price:100,id:3}
           ]
       }
       this.calculateTotal= this.calculateTotal.bind(this);
       this.createProduct= this.createProduct.bind(this);
       this.deleteProduct= this.deleteProduct.bind(this);
       this.editHandle= this.editHandle.bind(this);
    }
    showProduct(name){
        alert("You selected "  + name);
    }

    calculateTotal(price){
        this.setState({total: this.state.total + price})
    }

    createProduct(product){
        this.setState({
            productList: this.state.productList.concat(product)
        })
    }

    deleteProduct(product){
        console.log("HIII",product);
        this.setState((prevState) => ({...prevState,
            productList:prevState.productList.filter(deleted => deleted.name !== product)
        }));      
        setTimeout(() => {
        console.log(this.state);},1000
        )
    }

    editHandle(names,prices,i){
        console.log("Editing",names,prices,i);
        this.setState(prevState => ({...prevState,
            productList: this.state.productList.map(product => (product.id === i) ? {...product,
                // name,price
                name:names,price:prices} : product)
        }))
       
    }

    render(){
        var products= this.state.productList.map((product) => {
                                        //  can use index in map method for key attribute. 
            return ( <Other name={product.name} price={product.price} index={product.id} key={product.id} handleShow={this.showProduct}
            handleTotal= {this.calculateTotal} handleDelete={this.deleteProduct} handleEdit={this.editHandle}/>)
        })
        return(
            <div className="container-fluid">
            <div className="row">
              <div className="App">
                 <header className="App-header">
                   <img src={logo} className="App-logo" alt="logo" />
                   <h1 className="App-title">Welcome to React</h1>
                 </header>
                 </div>
                 <hr/>
                <ProductForm handleCreate={this.createProduct}/>
                 {products}
                
                <Total total={this.state.total}/>
               </div>
            </div>
        )
    }
}

export default ProductList;
