# TS-NG_articles

![image](https://user-images.githubusercontent.com/56207146/171958546-6bec1033-0b01-4bff-977f-e26524bfc13c.png)

## Tables of Contents

- [TS-NG_articles](#ts-ng_articles)
  - [Tables of Contents](#tables-of-contents)
  - [Starting the project](#starting-the-project)
    - [Downloading and running the project](#downloading-and-running-the-project)
  - [Project tree](#project-tree)

## Starting the project

### Downloading and running the project

- Clone / Download this project
- Open _Visual Studio Code_
- Open a CLI and install the dependencies with `npm run init`
- Once done, run `npm run start`

## Project tree

```
📦 
├─ .browserslistrc
├─ .circleci
│  ├─ config.yml
│  └─ utils.sh
├─ .editorconfig
├─ .eslintrc
├─ .gitignore
├─ .prettierrc
├─ .stylelintrc
├─ README.md
├─ angular.json
├─ e2e
│  ├─ protractor.conf.js
│  ├─ src
│  │  ├─ app.e2e-spec.ts
│  │  └─ app.po.ts
│  └─ tsconfig.json
├─ karma.conf.js
├─ ngsw-config.json
├─ package-lock.json
├─ package.json
├─ src
│  ├─ app
│  │  ├─ app-routing.module.ts
│  │  ├─ app.component.html
│  │  ├─ app.component.scss
│  │  ├─ app.component.spec.ts
│  │  ├─ app.component.ts
│  │  ├─ app.module.ts
│  │  ├─ app.server.module.ts
│  │  ├─ areas
│  │  │  ├─ article-add
│  │  │  │  ├─ article-add.component.html
│  │  │  │  ├─ article-add.component.scss
│  │  │  │  ├─ article-add.component.spec.ts
│  │  │  │  └─ article-add.component.ts
│  │  │  ├─ article-list
│  │  │  │  ├─ article-list.component.html
│  │  │  │  ├─ article-list.component.scss
│  │  │  │  ├─ article-list.component.spec.ts
│  │  │  │  └─ article-list.component.ts
│  │  │  ├─ article-view-comments
│  │  │  │  ├─ article-view-comments.component.html
│  │  │  │  ├─ article-view-comments.component.scss
│  │  │  │  ├─ article-view-comments.component.spec.ts
│  │  │  │  └─ article-view-comments.component.ts
│  │  │  ├─ article-view
│  │  │  │  ├─ article-view.component.html
│  │  │  │  ├─ article-view.component.scss
│  │  │  │  ├─ article-view.component.spec.ts
│  │  │  │  └─ article-view.component.ts
│  │  │  ├─ error
│  │  │  │  ├─ error.component.html
│  │  │  │  ├─ error.component.scss
│  │  │  │  └─ error.component.ts
│  │  │  ├─ home
│  │  │  │  ├─ home.component.html
│  │  │  │  ├─ home.component.scss
│  │  │  │  └─ home.component.ts
│  │  │  ├─ index.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.component.html
│  │  │  │  ├─ login.component.spec.ts
│  │  │  │  └─ login.component.ts
│  │  │  ├─ logout
│  │  │  │  ├─ logout.component.spec.ts
│  │  │  │  └─ logout.component.ts
│  │  │  ├─ nav
│  │  │  │  ├─ nav.component.html
│  │  │  │  ├─ nav.component.scss
│  │  │  │  ├─ nav.component.spec.ts
│  │  │  │  └─ nav.component.ts
│  │  │  ├─ not-found
│  │  │  │  ├─ not-found.component.html
│  │  │  │  ├─ not-found.component.scss
│  │  │  │  └─ not-found.component.ts
│  │  │  ├─ register
│  │  │  │  ├─ register.component.html
│  │  │  │  ├─ register.component.scss
│  │  │  │  ├─ register.component.spec.ts
│  │  │  │  └─ register.component.ts
│  │  │  ├─ restricted
│  │  │  │  ├─ restricted.component.html
│  │  │  │  ├─ restricted.component.scss
│  │  │  │  └─ restricted.component.ts
│  │  │  ├─ user-list
│  │  │  │  ├─ user-list.component.html
│  │  │  │  ├─ user-list.component.scss
│  │  │  │  ├─ user-list.component.spec.ts
│  │  │  │  └─ user-list.component.ts
│  │  │  ├─ user-profile-edit
│  │  │  │  ├─ user-profile-edit.component.html
│  │  │  │  ├─ user-profile-edit.component.scss
│  │  │  │  ├─ user-profile-edit.component.spec.ts
│  │  │  │  └─ user-profile-edit.component.ts
│  │  │  └─ user-profile
│  │  │     ├─ user-profile.component.html
│  │  │     ├─ user-profile.component.scss
│  │  │     ├─ user-profile.component.spec.ts
│  │  │     └─ user-profile.component.ts
│  │  ├─ pipes
│  │  │  ├─ empty
│  │  │  │  ├─ empty.pipe.spec.ts
│  │  │  │  └─ empty.pipe.ts
│  │  │  ├─ index.ts
│  │  │  ├─ length
│  │  │  │  ├─ length.pipe.spec.ts
│  │  │  │  └─ length.pipe.ts
│  │  │  └─ truncate
│  │  │     ├─ truncate.pipe.spec.ts
│  │  │     └─ truncate.pipe.ts
│  │  ├─ services
│  │  │  ├─ article.service.ts
│  │  │  ├─ auth-guard-logged.service.ts
│  │  │  ├─ auth-guard-not-logged.service.ts
│  │  │  ├─ auth.service.ts
│  │  │  ├─ comment.service.ts
│  │  │  ├─ find-username-by-id.service.ts
│  │  │  ├─ index.ts
│  │  │  ├─ token-interceptor.service.ts
│  │  │  └─ user.service.ts
│  │  └─ shared
│  │     ├─ app-info.service.ts
│  │     ├─ index.ts
│  │     ├─ models
│  │     │  ├─ article.model.ts
│  │     │  ├─ comment.model.ts
│  │     │  └─ user.model.ts
│  │     ├─ shared.module.ts
│  │     └─ toast
│  │        ├─ toast.component.html
│  │        ├─ toast.component.scss
│  │        ├─ toast.component.spec.ts
│  │        └─ toast.component.ts
│  ├─ assets
│  │  ├─ imgs
│  │  │  ├─ app-bg.jpg
│  │  │  └─ app-bg.min.jpg
│  │  └─ styles
│  │     ├─ _colors.scss
│  │     ├─ _mixins.scss
│  │     ├─ _vars-def.scss
│  │     ├─ _vars.scss
│  │     ├─ components
│  │     │  ├─ _components.scss
│  │     │  ├─ activity.scss
│  │     │  ├─ reset.scss
│  │     │  ├─ shell.scss
│  │     │  └─ typography.scss
│  │     └─ themes
│  │        ├─ _dark-theme.scss
│  │        └─ _light-theme.scss
│  ├─ environments
│  │  ├─ environment.prod.ts
│  │  └─ environment.ts
│  ├─ favicon.ico
│  ├─ index.html
│  ├─ main.server.ts
│  ├─ main.ts
│  ├─ polyfills.ts
│  ├─ styles.scss
│  ├─ test.ts
│  ├─ tsconfig.app.json
│  ├─ tsconfig.server.json
│  ├─ tsconfig.spec.json
│  └─ typings.d.ts
├─ tsconfig.app.json
├─ tsconfig.base.json
├─ tsconfig.json
├─ tsconfig.spec.json
└─ tslint.json
```
