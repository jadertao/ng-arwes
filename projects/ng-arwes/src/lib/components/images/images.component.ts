// import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';
// import { genInstanceID, ComponentStyleGenerator } from 'ng-arwes/tools/style';
// import { NgArwesTheme } from 'ng-arwes/types/theme.interfaces';

// @Component({
//   selector: 'arwes-images',
//   styleUrls: ['./images.component.css'],
//   template: `
// <figure>
// </figure>
//   `,
// })
// export class ImagesComponent implements OnInit, OnDestroy, OnChanges {
//   public name = 'arwes-images';
//   public id = genInstanceID(this.name);
//   public theme: NgArwesTheme | null = null;
//   public styleUpdater: ComponentStyleGenerator<ArwesButtonInput>;
//   private destroy$ = new Subject<void>();
//   private change$ = new Subject<ArwesButtonInput>();

//   constructor(
//     private themeSvc: ThemeService,
//     private style: StyleService,
//     private collect: CollectService
//   ) {
//     this.styleUpdater = new ComponentStyleGenerator<ArwesButtonInput>(style)
//       .info({ name: this.name, id: this.id })
//       .forClass(genButtonClassStyle)
//       .forInstance(genButtonInstanceStyle);

//     const pipe$ = this.themeSvc.theme$.pipe(
//       takeUntil(this.destroy$)
//     );
//     pipe$.subscribe((theme) => {
//       this.theme = theme;
//       this.styleUpdater.updateClass({ theme });
//     });

//     combineLatest(
//       this.change$,
//       pipe$
//     ).subscribe(([input, theme]) => {
//       this.styleUpdater.updateInstance({ input, theme });
//     });

//   }

//   ngOnChanges() {
//     const inputs = this.collect.gather<ArwesButtonInput>(this);
//     this.change$.next(inputs);
//   }

//   ngOnInit() { }

//   ngOnDestroy(): void {
//     this.destroy$.next();
//     this.destroy$.complete();
//   }

// }
