import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
class stack<T>
        {
            items:T[]=[];
    
            constructor(private capacity: number = Infinity) {
            }
            push(ele:T)
            {
                this.items.push(ele);
                
            }
            pop()
            {
                this.items.pop();
            }
            peek()
            {
                return this.items[this.items.length-1];
            }
            size()
            {
                return this.items.length;
            }
            printStack()
            {
                var str = "";
                for (var i = 0; i < this.items.length; i++)
                {
                    str += this.items[i] + " ";
                }
                return str;
            }


        }
    var operators=new stack<string>();
    var operands=new stack<number>();

const App = () => {
    var [value,setvalue]=useState('0');
    var [num,setnum]=useState('');
    
    
    const evaluate=(x1:number,x2:number,y:string):number=>
    {
        switch(y)
        {
            case '+':
            {
                return x1+x2;
            }
            case '-':
            {
                return x1-x2;
            }
            case '*':
            {
                return x1*x2;
            }
            case '/':
            {
                return x1/x2;
            }
            default:
            {
                return 0;
            }
        }
    }
       
    
    const calculate=(input:string)=>
    {
        

        let firstnum:number,secondnum:number,operation:string,res:number;
        let symbols:string[]=['+','-','*','/'];
        if(input=='=')
        {
            operands.push(parseFloat(num));
           
            while(operators.size()!=0)
            {
                secondnum=operands.peek();
                operands.pop();
                firstnum=operands.peek();
                operands.pop();
                operation=operators.peek();
                operators.pop();
                res=evaluate(firstnum,secondnum,operation);
                
                operands.push(res);
                
            }
            setvalue('');
            setnum(operands.peek().toString());
        }
        else if(input=='DEL')
        {
            setnum(num.slice(0,-1));
        }
        else if(input=='C')
        {
            setvalue('0');
            setnum('');
            while(operands.size()!=0)
            {
                operands.pop();
            }
            while(operators.size()!=0)
            {
                operators.pop();
            }
        }
        else 
        {
            if(symbols.indexOf(input)!=-1)
            {
                operands.push(parseFloat(num));
                
                if(operators.size()==0)
                {
                    operators.push(input);
                }
                else 
                {
                    while(symbols.indexOf(operators.peek())>symbols.indexOf(input))
                    {
                    secondnum=operands.peek();
                    operands.pop();
                    //console.log(secondnum);
                    firstnum=operands.peek();
                    operands.pop();
                    //console.log(firstnum);
                    operation=operators.peek();
                    operators.pop();
                    res=evaluate(firstnum,secondnum,operation); 
                    //console.log(res);
                    operands.push(res);
                    }
                    operators.push(input);
                    //console.log(operators.printStack());
                    //console.log(operands.printStack());

                }
                if(value==='Error' || value=='0')
                {      
                    value='';
                }
                setvalue(value+num+input);
                setnum('');
            }
            else
            {
                setnum(num+input);
            }

        }
    }

  return (
    <View>
        <View  style={styles.title}>
        <Text style={styles.text}>MY CALCULATOR</Text>
        </View>
        <View >
            <Text style={styles.container}>{value}{'\n'}{num}</Text>
        
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('C')}><Text style={styles.btext}>C</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('DEL')}><Text style={styles.btext}>DEL</Text></TouchableOpacity> 
            </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('1')}><Text style={styles.btext}>1</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('2')}><Text style={styles.btext}>2</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('3')}><Text style={styles.btext}>3</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('/')}><Text style={styles.btext}>/</Text></TouchableOpacity> 
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('4')}><Text style={styles.btext}>4</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('5')}><Text style={styles.btext}>5</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('6')}><Text style={styles.btext}>6</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('*')}><Text style={styles.btext}>*</Text></TouchableOpacity> 
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('7')}><Text style={styles.btext}>7</Text></TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('8')}><Text style={styles.btext}>8</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('9')}><Text style={styles.btext}>9</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('-')}><Text style={styles.btext}>-</Text></TouchableOpacity> 
        </View>
        <View style={styles.row}>
            <TouchableOpacity style={styles.button} onPress={()=>calculate('0')}><Text style={styles.btext}>0</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('.')}><Text style={styles.btext}>.</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('=')}><Text style={styles.btext}>=</Text></TouchableOpacity> 
            <TouchableOpacity style={styles.button} onPress={()=>calculate('+')}><Text style={styles.btext}>+</Text></TouchableOpacity> 
        

        </View>
    </View>
  );
}
const styles=StyleSheet.create({
    title:
    {
        padding:50
    },
    text:{
        textAlign:'center',
        fontSize:30
    },
   container:{
        height:100,
        width:375,
        margin:20,
        borderWidth:2,
        borderColor:'black',
        fontSize:25,
        textAlign:'right',
        paddingRight:20,
        paddingTop:20
        
   },
   
   row:{
    flexDirection:'row',
    justifyContent:'space-between',
    margin:20
   },
   button:{
    
    height:50,
    width:75,
    padding:6,
    borderWidth:2,
    borderColor:'black'
   },
   btext:{
        textAlign:'center',
        fontSize:25,
   }
})

export default App;
function indexOf(input: string) {
    throw new Error('Function not implemented.');
}

function includes(input: string) {
    throw new Error('Function not implemented.');
}

