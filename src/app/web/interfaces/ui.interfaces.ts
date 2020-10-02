export interface InvictaItem {
  text: string;
}

export interface AdvertisementItem {
  title: string;
}

export interface SliderItem {
  image: string;
}

export interface StoreSelected {
  ruc: string,
  name: string
}

export interface WhatsappNumber {
  phone: string;
  ruc: string;
}

export interface WebPhones {
  gindarPhones: WhatsappNumber[];
  rogerPhones: WhatsappNumber[];
}

