<!-- PROJECT LOGO -->
![][product-logo]
<p align="center">
<h1 align="center">FICOSEC Centro Sur</h1>
  <p align="center">
    <a href="https://proyectos.ficosec.org">PRODUCTION</a>
    ·
    <a href="https://ficosec-centro-sur-web-dev.now.sh/">DEV</a>
  </p>
</p>



<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#deployments">Deployments</a></li>
    <li><a href="#known-issues">Known Issues</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://example.com)

Proyecto desarrollado para [FICOSEC](https://ficosec.org/), que es un fideicomiso dirigido por empresarios del estado
de Chihuahua, apartidista y sin fines de lucro. La ejecución de proyectos encaminados a su misión se realiza a través
de dos Asociaciones Civiles que son Seguridad y Justicia de Ciudad Juárez A.C. y Fundación Ficosec A.C. ubicadas en la
Zona Norte (Ciudad Juárez y Nuevo Casas Grandes) y en la Zona Centro y Sur del estado (Chihuahua, Cuauhtémoc, Delicias
y Parral).


### Built With
* [ReactJS](https://reactjs.org)
* [NextJS](https://nextjs.org)
* [Apollo](https://www.apollographql.com/docs/react)
* [Firebase](https://firebase.google.com/)
* [Antd](https://ant.design/components/overview/)
* [Sass](https://sass-lang.com/)



<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/en/download/) 10.13 or later

### Installation
1. Ask for project environment variables
2. Clone the repo
   ```sh
   git clone https://github.com/jaxitanku/ficosec-centro-sur-web
   ```
3. Install NPM packages
   ```sh
    npm install
   ```
4. Duplicate the file `.env.example` and name it `.env` and paste variables inside
5. Run project
   ```sh
    npm run dev
   ``` 

<!-- DEPLOYING -->
## Deployments

This project uses [Vercel](https://vercel.com/docs) which takes care of deployments. Every time a branch is created and
pushed into the repo, Vercel creates a preview environment that enables you to test your changes online

It also automatically deploys new changes pushed to `dev` and `master` to their respective URL's.


<!-- ISSUES -->
## Known Issues



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[product-screenshot]: public/assets/screenshot.png
[product-logo]: public/assets/logo-fico.png
