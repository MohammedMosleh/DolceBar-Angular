export class Product {
  public name: string;
  public image: string;
  public price: number;
  public description: string;
  public technicalDetails: string;
  public categoryId: number;

  constructor(
    name: string,
    image: string,
    price: number,
    description: string,
    technicalDetails: string,
    categoryId: number
  ) {
    this.name = name;
    this.image = image;
    this.price = price;
    this.description = description;
    this.technicalDetails = technicalDetails;
    this.categoryId = categoryId;
  }
}