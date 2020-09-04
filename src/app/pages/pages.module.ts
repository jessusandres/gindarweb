import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {WePageComponent} from './we-page/we-page.component';
import {SharedModule} from '../shared/shared.module';
import {HttpClientModule} from '@angular/common/http';
import {ReleasesComponent} from './releases/releases.component';
import {PromotionsComponent} from './promotions/promotions.component';
import {CarouselItemComponent} from './home/carousel-item/carousel-item.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {ReturnPolicyComponent} from './return-policy/return-policy.component';
import {RouterModule} from '@angular/router';
import {FeaturedProductComponent} from './home/featured-product/featured-product.component';
import {VideoItemComponent} from './home/video-item/video-item.component';
import {GServicesComponent} from './home/g-services/g-services.component';
import {AgmCoreModule} from '@agm/core';
import {MAPS_API_KEY} from '../config/config';
import { ShowcaseComponent } from './showcase/showcase.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ShowcaseItemComponent } from './showcase/showcase-item/showcase-item.component';
import { ReleaseItemComponent } from './releases/release-item/release-item.component';
import { PromotionItemComponent } from './promotions/promotion-item/promotion-item.component';
import { CartComponent } from './cart/cart.component';
import { SearchComponent } from './search/search.component';
import { CartItemComponent } from './cart/cart-item/cart-item.component';
import { ContactComponent } from './contact/contact.component';
import { ClaimComponent } from './claim/claim.component';


@NgModule({
  declarations: [
    HomeComponent,
    WePageComponent,
    ReleasesComponent,
    PromotionsComponent,
    CarouselItemComponent,
    PrivacyPolicyComponent,
    ReturnPolicyComponent,
    FeaturedProductComponent,
    VideoItemComponent,
    GServicesComponent,
    ShowcaseComponent,
    ItemDetailComponent,
    ShowcaseItemComponent,
    ReleaseItemComponent,
    PromotionItemComponent,
    CartComponent,
    SearchComponent,
    CartItemComponent,
    ContactComponent,
    ClaimComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    AgmCoreModule.forRoot({
      apiKey: MAPS_API_KEY
    })
  ],
  exports: [
    HomeComponent,
    WePageComponent
  ]
})
export class PagesModule {
}
