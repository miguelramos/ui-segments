# Navbar Component

# Templating

```
<nav ui-nav class="is-info" [isTransparent]="true" [isFixedBottom]="true">
  <ui-navbar-brand>
    <a ui-navbar-item (onClick)="onItemClick($event)">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </a>
    <ui-navbar-burger (onChange)="onBurgerChange($event)" data-target="target-menu"></ui-navbar-burger>
  </ui-navbar-brand>
  <ui-navbar-menu id="target-menu">
    <div class="navbar-start">
      <div ui-navbar-item (onClick)="onItemClick($event)" [hasDropdown]="true" [hasDropdownUp]="true">
        <a ui-navbar-link>
          Components
        </a>
        <div ui-navbar-dropdown [isRight]="true">
          <a ui-navbar-item>
            Overview
          </a>
        </div>
      </div>
    </div>
  </ui-navbar-menu>
</nav>
```

For more information check source files for now.
