'use strict';

(function(){

    /**
     * ++++ Vue Keyboard Components
     */
        Vue.component('populate-row', {
            props: ['value'],
            template:
                `<div @click="onClickButton(value.id, value.type, value.value)" class="w3-col s3 w3-center key">
                    <p>{{value.key_label}}</p>
                </div>`,
            methods: {
                onClickButton: (f_id, f_type, f_value)=> {
                    if(f_type == 'option'){
                        switch(f_value){
                            case 'clear': clearConsole(); break;
                            case 'delete': backspaceConsole(); break;
                        }
                    }else if(f_type == 'operand'){
                        appConsole.updateValue(f_value);
                    }
                }
            }
        });
        
        Vue.component('xplore-keyboard', {
            props: ['button'],
            template: 
                `<div class="w3-row">
                    <populate-row
                        v-for = "items in button.keys"
                        v-bind:value = "items"
                        v-bind:key = "items.id">
                    </populate-row>
                </div>`
        });
    /**
     * ---- Vue Keyboard Components
     */

    // Application Keyboard Vue Object
    var appKeyboard = new Vue({
        el: '#keyboard',
        data: {
          groceryList: [
            { id: 0, text: 'Vegetables' },
            { id: 1, text: 'Cheese' },
            { id: 2, text: 'Whatever else humans are supposed to eat' }
          ],
          keyData: [
            {   row_id: 'keyboard-row-0', 
                keys: [
                    { key_label :'C', id: 'keyboard-option-clear', type: 'option', value: 'clear'},
                    { key_label :'+/-', id: 'keyboard-operator-plusminus', type: 'operator', value: 'plusminus'},
                    { key_label :'%', id: 'keyboard-operator-percentile', type: 'operator', value: 'percentile'},
                    { key_label :'DEL', id: 'keyboard-option-delete', type: 'option', value: 'delete'}
                ]
            },
            {   row_id: 'keyboard-row-1', 
                keys: [
                    { key_label :'7', id: 'keyboard-number-7', type: 'operand', value: 7},
                    { key_label :'8', id: 'keyboard-number-8', type: 'operand', value: 8},
                    { key_label :'9', id: 'keyboard-number-9', type: 'operand', value: 9},
                    { key_label :'/', id: 'keyboard-function-divide', type: 'operator', value: 'divide'}
                ]
            },
            {   row_id: 'keyboard-row-2', 
                keys: [
                    { key_label :'4', id: 'keyboard-number-4', type: 'operand', value: 4},
                    { key_label :'5', id: 'keyboard-number-5', type: 'operand', value: 5},
                    { key_label :'6', id: 'keyboard-number-6', type: 'operand', value: 6},
                    { key_label :'x', id: 'keyboard-function-multiply', type: 'operator', value: 'multiply'}
                ]
            },
            {   row_id: 'keyboard-row-3', 
                keys: [
                    { key_label :'1', id: 'keyboard-number-1', type: 'operand', value: 1},
                    { key_label :'2', id: 'keyboard-number-2', type: 'operand', value: 2},
                    { key_label :'3', id: 'keyboard-number-3', type: 'operand', value: 3},
                    { key_label :'-', id: 'keyboard-function-subtract', type: 'operator', value: 'subtract'}
                ]
            },
            {   row_id: 'keyboard-row-4', 
                keys: [
                    { key_label :'.', id: 'keyboard-number-point', type: 'operator', value: 'fraction'},
                    { key_label :'0', id: 'keyboard-number-0', type: 'operand', value: 0},
                    { key_label :'=', id: 'keyboard-number-equal', type: 'operator', value: 'equal'},
                    { key_label :'+', id: 'keyboard-function-plus', type: 'operator', value: 'subtract'}
                ]
            },
        ]}
    });

    var appConsole = new Vue({
        el: "#console",
        data: {
            value: "0",
            styleObject: {
                fontSize: '4em',
                color: 'white',
                wordWrap: 'break-word',
                position: 'absolute',
                bottom: '0',
                right: '10px'
            },
            zeroIndex: true
        },
        methods: {
            updateValue: (val) => {
                if(appConsole.value.length < 39){
                    appConsole.adjustConsole();
                    appConsole.zeroIndex? appConsole.value = ""+val : appConsole.value += ""+val;
                    appConsole.zeroIndex? appConsole.zeroIndex = false: '';
                }
            },
            adjustConsole: ()=>{
                let fontSize = Number((appConsole.styleObject.fontSize).split('em')[0]);
                appConsole.styleObject.fontSize = (fontSize - computeOffset(fontSize))+"em";
            }
        },
    });

    function backspaceConsole(){
        if(appConsole.value.length < 2){
            clearConsole();
            return;
        }
        appConsole.value.slice(0,appConsole.value.length -1);
        appConsole.value = appConsole.value.substring(0, appConsole.value.length - 1)
    }

    function clearConsole(){
        appConsole.styleObject.fontSize = '4em';
        appConsole.zeroIndex = true;
        appConsole.value = "0";
    }

    function computeOffset() {
        let result = 0

        result = appConsole.value.length == 7 ? 1 : ''
        result = appConsole.value.length == 9 ? 0.2 : ''
        result = appConsole.value.length >= 9 && appConsole.value.length <= 14 ? 0.2 : ''
        result = appConsole.value.length == 15 ? 0.2 : ''
        result = appConsole.value.length == 17 ? 0.2 : ''
        result = appConsole.value.length == 20 ? 0.2 : ''
        result = appConsole.value.length == 24 ? 0.1 : ''
        result = appConsole.value.length == 26 ? 0.067 : ''
        result = appConsole.value.length == 28 ? 0.067 : ''
        result = appConsole.value.length == 30 ? 0.047 : ''
        result = appConsole.value.length == 31 ? 0.037 : ''
        result = appConsole.value.length >= 32 && appConsole.value.length < 37 ? 0.017 : ''
        result = appConsole.value.length == 37 ? 0.050 : ''

        return result
    }
})();
