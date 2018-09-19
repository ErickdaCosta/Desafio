import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { CoffeeProvider } from '../../providers/coffee/coffee';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private availablesCoffees: any;

  constructor(public navCtrl: NavController, private coffeeProvider: CoffeeProvider) {
    // this.coffeeProvider.getCoffees().subscribe(coffees =>{
    //   console.log(coffees);
    // },console.error);

    this.availablesCoffees = {
      "products": [
        {
          "title": "Expresso",
          "image": "data:image/png;base64,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",
          "size": 0,
          "sugar": 0
        },
        {
          "title": "Cappuccino",
          "image": "data:image/png;base64,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",
          "size": 1,
          "sugar": 2,
          "additional": [
            "coffee",
            "chocolate",
            "cinnamon"
          ]
        },
        {
          "title": "Macchiato",
          "image": "data:image/png;base64,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",
          "size": 1,
          "sugar": 3,
          "additional": [
            "milk",
            "coffee"
          ]
        },
        {
          "title": "Mocha",
          "image": "data:image/png;base64,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",
          "size": 2,
          "sugar": 2,
          "additional": [
            "chocolate",
            "chantilly"
          ]
        },
        {
          "title": "Latte",
          "image": "data:image/png;base64,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",
          "size": 2,
          "sugar": 1,
          "additional": [
            "chantilly"
          ]
        }
      ]
    }
  }

  private showDetails(coffe: any): void{
    this.navCtrl.push('DetailsPage', coffe);
  }

}
