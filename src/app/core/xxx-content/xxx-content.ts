import { ChangeDetectionStrategy, Component, inject, input, InputSignal, OnInit, Signal } from '@angular/core';
import { XxxContentFacade } from './xxx-content-facade';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'xxx-content',
  templateUrl: './xxx-content.html'
})
export class XxxContent implements OnInit {
  contentKey:InputSignal<string> = input<string>('');
  private contentFacade: XxxContentFacade = inject(XxxContentFacade);
  protected readonly isContentEmpty: Signal<boolean> = this.contentFacade.isContentEmpty(this.contentKey());
  protected readonly isContentLoading: Signal<boolean> = this.contentFacade.isContentLoading(this.contentKey());

  ngOnInit(): void {
    this.contentFacade.showContent(this.contentKey());
  }
}
