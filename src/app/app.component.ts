import { Component, ChangeDetectorRef } from '@angular/core';
import { ExternalLibraryService } from './util';

declare let Razorpay: any;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private razorpayService: ExternalLibraryService, private cd:  ChangeDetectorRef) { }
  name = 'Angular';
  response;
  razorpayResponse;
  showModal = false;

  ngOnInit() {
    this.razorpayService
      .lazyLoadLibrary('https://checkout.razorpay.com/v1/checkout.js')
      .subscribe();
  }

  RAZORPAY_OPTIONS = {
    "key": "rzp_test_WMHWnR6EYJOqTX",
    "amount": "1",
    "name": "Blynkspeak",
    "order_id": "",
    "description": "Load Wallet",
    "image": "https://www.blynkspeak.com/assets/images/logo-122x71.png",
    "prefill": {
      "name": "sdad",
      "email": "test@test.com",
      "contact": "+919535461483",
      "method": "sdfsf",
    },
    "modal": {},
    "theme": {
      "color": "#0096C5"
    }
  };

  public proceed() {
    this.RAZORPAY_OPTIONS.amount = 1 + '00';

    // binding this object to both success and dismiss handler
    this.RAZORPAY_OPTIONS['handler'] = this.razorPaySuccessHandler.bind(this);


    let razorpay = new Razorpay(this.RAZORPAY_OPTIONS)
    razorpay.open();
  }

  public razorPaySuccessHandler(response) {
    console.log(response);
    this.razorpayResponse = 'Razorpay Response '+ response.razorpay_payment_id;
    this.showModal = true;
    this.cd.detectChanges()
    document.getElementById('razorpay-response').style.display = 'block';
  }

  public test() {
    document.getElementById('response-modal').style.display = 'block';
    this.response = `dummy text`;
  }


}
