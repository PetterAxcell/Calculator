let options = {
    data: function(){
        return {
            newText : "",
            symbols : ['+', '-', 'x', '/', '='],
            currentSymbol : "",
            stackSymbol:[],
            stackNumber:[],
            numberSymbol: 0,
            lastSymbol: -1
        }
    },
    methods:{
        Operation(aux, aux2){
            this.stackNumber.pop()
            this.stackNumber.pop()
            this.RemoveAllSymbols()
            this.newText = ""
            this.AddNumber(aux)
            this.AddSymbol(aux2)
        },
        RemoveAllSymbols(){
            this.stackSymbol.pop()
            this.stackSymbol.pop()
            this.numberSymbol = 0

        },
        CheckSymbol(){
            //This function checks if there are a symbol
            let flag = false;
            for (let i =0; i<this.symbols.length; i++){
                if(this.newText.charAt(this.newText.length - 1) == this.symbols[i]){flag=true;}
            }
            return flag
        },
        AddSymbol(sym){
            //Add a symbol or replace the last symbol
            let flag = this.CheckSymbol()
            if(flag){
                this.newText = this.newText.substring(0, this.newText.length - 1) + sym
                this.stackSymbol[this.stackSymbol.length-1] = sym
                if(sym == '=')
                {
                    this.AllOperation()
                    console.log(this.stackNumber)
                    console.log(this.stackSymbol)
                }
            }
            else{
                this.newText = this.newText + sym
                this.stackSymbol.push(sym)
                this.numberSymbol= this.numberSymbol+1;
            }
        },
        AddNumber(number){
            //Add a number
            this.newText=this.newText + number
            if(this.stackNumber.length == 0){
                this.stackNumber.push(parseInt(this.newText, 10))
            }
            else{
                if( 
                    (this.newText.substring(this.newText.length - 2, this.newText.length - 1) == '+') || 
                    (this.newText.substring(this.newText.length - 2, this.newText.length - 1) == '-') ||
                    (this.newText.substring(this.newText.length - 2, this.newText.length - 1) == 'x') || 
                    (this.newText.substring(this.newText.length - 2, this.newText.length - 1) == '/') || 
                    (this.newText.substring(this.newText.length - 2, this.newText.length - 1) == '=')
                )
                {
                    this.lastSymbol = this.newText.length - 2
                    this.stackNumber.push(parseInt(this.newText.substring(this.newText.length - 1, this.newText.length), 10))
                }
                else{
                    this.stackNumber[this.stackNumber.length-1] = parseInt(this.newText.substring(this.lastSymbol+1, this.newText.length), 10)
                }
            }

        },
        AllOperation(){
            if(this.numberSymbol == 2)
            {
                if(this.stackSymbol[0] == '+'){
                    let aux = this.stackNumber[0] + this.stackNumber[1]
                    let aux2 = this.stackSymbol[1]
                    this.Operation(aux, aux2)
                }
                else{
                    if(this.stackSymbol[0] == '-'){
                        let aux = this.stackNumber[0] - this.stackNumber[1]
                        let aux2 = this.stackSymbol[1]
                        this.Operation(aux, aux2)
                    }
                    else{
                        if(this.stackSymbol[0] == 'x'){
                            let aux = this.stackNumber[0] * this.stackNumber[1]
                            let aux2 = this.stackSymbol[1]
                            this.Operation(aux, aux2)
                        }
                        else{
                            if(this.stackSymbol[0] == '/'){
                                let aux = this.stackNumber[0] / this.stackNumber[1]
                                let aux2 = this.stackSymbol[1]
                                this.Operation(aux, aux2)
                            }
                        }
                    }
                }
            }
            else{
                if(this.stackSymbol[0] == '='){
                    let aux = this.stackNumber[0]
                    this.newText = ""
                    this.stackNumber.pop()
                    this.AddNumber(aux)
                    this.RemoveAllSymbols()
                }

            }
        },
    },
    watch:{
        numberSymbol(){
            this.AllOperation()
        }
    },
    template: `
    <div>
        <h1> CALCULATOR </h1>
        <Screen :text=newText> </Screen>
        <NumbersCalculator v-on:number="AddNumber($event)"></NumbersCalculator>
        <SymbolsCalculator :symbolsVector=symbols v-on:newSymbol="AddSymbol($event)"></SymbolsCalculator>
    </div>
    `,
}

var app = Vue.createApp(options);

app.component('NumbersCalculator',{
    data: function()
    {
        return{
            
        }
    },
    emits:['number'],
    methods:{
        getNumber(x,y){
            let whichNumber = 3*(x-1)+y;
            this.$emit('number',whichNumber)
        }
    },
    template:
    `
    <div v-for="row in 3">
        <button v-on:click="getNumber(row, number)" v-for="number in 3">{{3*(row-1)+number}}</button>
    </div>
    `
})
app.component('SymbolsCalculator',{
    data: function()
    {
        return{

        }
    },
    props: ['symbolsVector'],
    emits:['newSymbol'],
    methods:{
        getSymbol(x){
            this.$emit('newSymbol',x)
        }
    },
    template:
    `
    <button v-for="symbol in symbolsVector" v-on:click="getSymbol(symbol)" >{{symbol}}</button>

    `
})
app.component('Screen',{
    data: function()
    {
        return{
            textScreen : "",
            numSymbols : 0,
            operation: []
        }
    },
    props:['text', 'symbolsVector'],
    methods:{
        calculate(){
        }
    },
    watch:{
        text:function(){
            this.textScreen = this.text
        }
    },
    template:
    `
    <input type="text" v-model="textScreen">
    `
})
const vm = app.mount('#app');