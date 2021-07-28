const app = Vue.createApp({
  data() {
    return {
      value: 0,
      preValue: 0,
      tmpResult: 0,
      point: '',
      positive: true,
      sign_now: '',
      sign_last: '',
      computeArray: [],
      computeProcess: '',
      history: [],
    }
  },
  methods: {
    getNum(even) {
      if(this.sign_now === '=') {
        this.value = 0;
        this.point = '';
        this.sign_now = '';
        this.sign_last = '';
        this.tmpResult = 0;
        this.computeArray = [];
        this.computeProcess = '';
      }
      if(this.point !== '.') {
        this.value = this.value * 10 + parseInt(even.target.value, 10);
      } else {
        this.value = this.value + parseInt(even.target.value, 10) * .1 ;
      }

      this.computeArray.push(`${even.target.value}`);
      this.computeProcess = this.computeArray.join('')
      console.log(this.value);
    },
    symbolBtn(even) {
      let normal = /[1-9]/.test(this.computeProcess);
      const len = this.computeArray.length;
      let is_number = /[1-9]/.test(this.computeArray[len-1]);
      if( normal === true && is_number === true) {
        this.sign_now = even.target.value;

        if(this.preValue === 0) {
          this.preValue = JSON.stringify(JSON.parse(this.value));
          console.log(this.preValue);
        } else {
          switch(this.sign_last) {
            case '+':
              this.tmpResult = parseFloat(this.preValue) + this.value;
              break;
            case '-':
              this.tmpResult = parseFloat(this.preValue) - this.value;
              break;
            case '×':
              this.tmpResult = parseFloat(this.preValue) * this.value;
              break;
            case '÷':
              this.tmpResult = parseFloat(this.preValue) / this.value;
              break;
          };
          this.preValue = this.tmpResult;
          console.log(this.preValue);
        };
        this.sign_last = this.sign_now;
        this.computeArray.push(`${this.sign_now}`);
        this.computeProcess = this.computeArray.join('');
        this.point = '';
        this.value = 0;
      }

    },
    pointBtn() {
      if(this.point === '') {
        this.point = '.';
        this.computeArray.push(`${this.point}`);
        this.computeProcess = this.computeArray.join('');
      }
    },
    equalBtn() {
      this.compute();
      this.computeArray.push(` = ${this.value}`);
      this.computeProcess = this.computeArray.join('');
      this.history.unshift(this.computeProcess);
      localStorage.setItem('history', JSON.stringify(this.history));
      this.preValue = 0;
      this.sign_now = '=';
    },
    compute() {
      switch(this.sign_last) {
        case '+':
          this.value = parseFloat(this.preValue) + this.value;
          break;
        case '-':
          this.value = parseFloat(this.preValue) - this.value;
          break;
        case '×':
          this.value = parseFloat(this.preValue) * this.value;
          break;
        case '÷':
          this.value = parseFloat(this.preValue) / this.value;
          break;
      };
    },
    negativeBtn() {
      this.positive = !this.positive
      this.value *= -1;
      const len = this.computeArray.length;

      let last_sing = this.computeArray.reverse().find( item => {
        return item === '+' || item === '-'|| item === '×' || item === '÷';
      })
      let sing_index = this.computeArray.indexOf(last_sing);
      this.computeArray.reverse();
      if(sing_index === -1) {
        this.computeArray.splice(0, 0, '-');
      } else {
        this.computeArray.splice(len - sing_index, 0, '-');
      }
    },
    percentageBtn() {

    },
    clearBtn() {
      this.value = 0;
      this.preValue = 0;
      this.point = '';
      this.sign_now = '';
      this.sign_last = '';
      this.tmpResult = 0;
      this.computeArray = [];
      this.computeProcess = '';
    },
    clearHistory() {
      localStorage.setItem("history", JSON.stringify([]));
      this.history = [];
    }
  },
  mounted() {
    this.history = JSON.parse(localStorage.getItem('history'));
  },
});
app.mount('#app');
