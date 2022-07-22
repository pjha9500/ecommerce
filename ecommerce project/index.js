


const parentContainer = document.getElementById('EcommerceContainer');

class Data{
    constructor(productid,name,price,quantity,img_src)
    {
        this.productid=productid;
        this.name=name;
        this.price=price;
        this.quantity=quantity;
        this.img_src=img_src;

    }
}

axios({
    method:'get',
    url:'http://localhost:3000/cartitems',
}).then((res)=> showfunction(res.data));


function showfunction(res)
{

    console.log(res);
    for(let i=0;i<res.length;i++)
    {

        let id=res[i].productid;
        let name=res[i].name;
        let price=res[i].price;
        let quantity=res[i].quantity;
        let img_src=res[i].img_src;
        let total_cart_price = document.querySelector('#total-value').innerText;



        console.log('cart value',document.querySelector('.cart-number').innerText);
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        console.log(document.querySelector('.cart-number'));
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`${id}`);
        console.log('cart_item',cart_item);
        total_cart_price = parseFloat(total_cart_price) + (quantity*parseFloat(price));
        console.log(total_cart_price);
        // total_cart_price = total_cart_price.toFixed(2)
        // console.log('total cart price',total_cart_price);
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        console.log(document.querySelector('#total-value').innerText);
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column' id='cart-quantity'>
        <input type="text" value='${quantity}'>
        <button>REMOVE</button>
    </span>`
    console.log('appendend',cart_item)
        cart_items.appendChild(cart_item)
        console.log('cart items',cart_items);

    }
}



const cart_items = document.querySelector('#cart .cart-items');

parentContainer.addEventListener('click',(e)=>{

    if (e.target.className=='shop-item-button'){
        const id = e.target.parentNode.parentNode.id
        console.log('id',id);
        let productid=`in-cart-${id}`;
        const name = document.querySelector(`#${id} h3`).innerText;
        console.log('name',name);
        const img_src = document.querySelector(`#${id} img`).src;
        console.log('imgsrc',img_src)
        const price = e.target.parentNode.firstElementChild.firstElementChild.innerText;
        console.log('price',price);


        let newProduct=new Data(productid,name,price,'1',img_src);
        console.log(newProduct);
        let total_cart_price = document.querySelector('#total-value').innerText;
        if (document.querySelector(`#in-cart-${id}`))
        {
            let quantity=parseInt(document.querySelector(`#in-cart-${id} input`).value)+1;
            document.querySelector(`#in-cart-${id} input`).value=parseInt(document.querySelector(`#in-cart-${id} input`).value)+1;
            
            console.log(document.querySelector(`#in-cart-${id} input`).value);
            console.log('tottalllllll',parseFloat(total_cart_price)+parseFloat(price));
            total_cart_price=parseFloat(total_cart_price)+parseFloat(price);
            document.querySelector('#total-value').innerText = `${total_cart_price}`;
            console.log(`#in-cart-${id}`);
                let sameProduct=new Data(productid,name,price,quantity,img_src);
            axios({
                method:'put',
                url:'http://localhost:3000/cartitems',
                data:sameProduct
            })


            alert('This item is already added to the cart');
            return

        }


        axios({
            method:'post',
            url:'http://localhost:3000/cartitems',
            data:newProduct
        }).then((result)=>{console.log(result)});
        
        // let total_cart_price = document.querySelector('#total-value').innerText;
        console.log('totalcart price',total_cart_price);
        if (document.querySelector(`#in-cart-${id}`)){
            document.querySelector(`#in-cart-${id} input`).value=parseInt(document.querySelector(`#in-cart-${id} input`).value)+1;
            console.log(document.querySelector(`#in-cart-${id} input`).value);
            console.log('tottalllllll',parseFloat(total_cart_price)+parseFloat(price));
            total_cart_price=parseFloat(total_cart_price)+parseFloat(price);
            document.querySelector('#total-value').innerText = `${total_cart_price}`;
            console.log(`#in-cart-${id}`);
            alert('This item is already added to the cart');
            return
        }
    console.log('cart value',document.querySelector('.cart-number').innerText);
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)+1
        console.log(document.querySelector('.cart-number'));
        const cart_item = document.createElement('div');
        cart_item.classList.add('cart-row');
        cart_item.setAttribute('id',`in-cart-${id}`);
        console.log('cart_item',cart_item);
        total_cart_price = parseFloat(total_cart_price) + parseFloat(price)
        console.log(total_cart_price);
        // total_cart_price = total_cart_price.toFixed(2)
        // console.log('total cart price',total_cart_price);
        document.querySelector('#total-value').innerText = `${total_cart_price}`;
        console.log(document.querySelector('#total-value').innerText);
        cart_item.innerHTML = `
        <span class='cart-item cart-column'>
        <img class='cart-img' src="${img_src}" alt="">
            <span>${name}</span>
    </span>
    <span class='cart-price cart-column'>${price}</span>
    <span class='cart-quantity cart-column' id='cart-quantity'>
        <input type="text" value="1">
        <button>REMOVE</button>
    </span>`
    console.log('appendend',cart_item)
        cart_items.appendChild(cart_item)
        console.log('cart items',cart_items);

        const container = document.getElementById('container');
        const notification = document.createElement('div');
        notification.classList.add('notification');
        notification.innerHTML = `<h4>Your Product : <span>${name}</span> is added to the cart<h4>`;
        container.appendChild(notification);
        setTimeout(()=>{
            notification.remove();
        },2500)

    }
    
    if (e.target.className=='cart-btn-bottom' || e.target.className=='cart-bottom' || e.target.className=='cart-holder'){
        document.querySelector('#cart').style.display = "block";
    }
    if (e.target.className=='cancel'){
        document.querySelector('#cart').style = "display:none;"
    }
    if (e.target.className=='purchase-btn'){
        if (parseInt(document.querySelector('.cart-number').innerText) === 0){
            alert('You have Nothing in Cart , Add some products to purchase !');
            return
        }
        alert('Thanks for the purchase')
        cart_items.innerHTML = ""
        document.querySelector('.cart-number').innerText = 0
        document.querySelector('#total-value').innerText = `0`;
    }

    if (e.target.innerText=='REMOVE'){

        console.log(e.target.parentNode.parentNode.id);
        console.log(e.target.parentNode.parentNode);
        if(parseInt(e.target.parentNode.firstElementChild.value)>1)
        {
            axios({
                method:'delete',
                url:`http://localhost:3000/cartitems/${e.target.parentNode.parentNode.id}`,
            }).then(()=>{console.log("removed")});
            let total_cart_price = document.querySelector('#total-value').innerText;
            let quantity=e.target.parentNode.firstElementChild.value;
            let removevalue=(quantity*parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2));
            total_cart_price = parseFloat(total_cart_price).toFixed(2) - removevalue ;
            document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
            e.target.parentNode.parentNode.remove()
            return;
        }

        axios({
            method:'delete',
            url:`http://localhost:3000/cartitems/${e.target.parentNode.parentNode.id}`,
        }).then(()=>{console.log("removed")});
        
        let total_cart_price = document.querySelector('#total-value').innerText;
        total_cart_price = parseFloat(total_cart_price).toFixed(2) - parseFloat(document.querySelector(`#${e.target.parentNode.parentNode.id} .cart-price`).innerText).toFixed(2) ;
        document.querySelector('.cart-number').innerText = parseInt(document.querySelector('.cart-number').innerText)-1
        document.querySelector('#total-value').innerText = `${total_cart_price.toFixed(2)}`
        e.target.parentNode.parentNode.remove()
    
    }
})


// function deletes(res)
// {
//     let x;
//     console.log(res);
//     axios({
//         method:'get',
//         url:`http://localhost:3000/cartitems/${res}`,
//     }).then((result)=>{console.log(result.data)});
//     // axios({
//     //     method:'delete',
//     //     url:`http://localhost:3000/cartitems/${res}`
//     // }).then(()=>{console.log('deletion Done');
//     //         location.reload()});

    
// }
