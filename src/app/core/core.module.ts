import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule, Optional, SkipSelf } from '@angular/core';

import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { PostService, UserService } from './services';

/**
 * This abstract class used for module building by extending this class
 * prevents importing the module into somewhere else than root App Module.
 */
export abstract class EnsureImportedOnceModule {
  protected constructor(targetModule: any) {
    if (targetModule) {
      throw new Error(`${targetModule.constructor.name} has already been loaded.`);
    }
  }
}

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule],
  providers: [
    PostService,
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    }
  ]
})
export class CoreModule extends EnsureImportedOnceModule {
  constructor(@SkipSelf() @Optional() parent: CoreModule) {
    super(parent);
  }
}
