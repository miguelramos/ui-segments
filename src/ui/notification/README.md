# Notification Component

# Templating

```
@Component({
  moduleId: module.id,
  selector: 'ng-notify',
  template: `<h1>My Custom Notification</h1>`
})
export class Notify {}

@Component({
  moduleId: module.id,
  selector: 'ng-ui-home',
  templateUrl: 'home.html',
  styleUrls: ['home.css'],
  preserveWhitespaces: false,
})
export class Home {

  constructor(
    private _notification: UINotification
  ) { }

  open() {
    this._notification.openWithComponent(Notify);
  }
}
```

For more information check source files for now.
