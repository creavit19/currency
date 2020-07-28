document.addEventListener("DOMContentLoaded", function(){
  const x = new XMLHttpRequest(); //объект ответственный за AJAX
  x.onreadystatechange = () => {
    if(x.readyState === 4){
      JSON.parse(x.responseText).forEach((item)=>{
        if(item.r030 == 978) window.rateeur.innerText = item.rate.toFixed(2);
        if(item.r030 == 840) window.rateusd.innerText = item.rate.toFixed(2);
      });
  }
}
x.open("GET", "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json", true);
x.send();
})

const e = React.createElement;

class Cont extends React.Component{
  constructor(props){super(props);
    this.state = {rates: []}
  }
  
  render(){
    return e('div',{className: 'out'},
              e('div', {className: 'header'},
              e('span', {}, 'Назва валюти'),
              e('span', {}, 'Код'),
              e('span', {}, 'Курс')),
              this.state.rates.map(rate=>e('div', {},
              e('span', {}, rate.txt),
              e('span', {}, rate.cc),
              e('span', {}, rate.rate))
              ))
  }
  componentDidMount(){  // Вызывается один раз при встраивании в DOM
    const url = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    fetch(url).then(x=>x.json()).then(data=>{
      this.setState({rates: data});
    })
  }
}
ReactDOM.render(
  e(Cont,{},{}), 
  document.getElementById('container'))

class Cont2 extends React.Component{
  constructor(props){super(props);
    this.state = {rates: []}
  }
  
  render(){
    return e('div',{className: 'out'},
              e('div', {className: 'header'},
              e('span', {}, 'Валюта'),
              e('span', {}, 'Покупка'),
              e('span', {}, 'Продажа')),
              this.state.rates.map(rate=>e('div', {},
              e('span', {}, rate.ccy),
              e('span', {}, rate.buy),
              e('span', {}, rate.sale))
              ))
  }
  componentDidMount(){  // Вызывается один раз при встраивании в DOM
    const url = 'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';
    fetch(url).then(x=>x.json()).then(data=>{
      this.setState({rates: data});
    })
  }
}

ReactDOM.render(
  e(Cont2,{},{}), 
  document.getElementById('container2'))