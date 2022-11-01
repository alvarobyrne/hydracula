# hydracula
Hydra extension to blood stain your sketches

Extensión de hydra para manchar sus bocetos con sangre

## Descripción

- seleccionando *tokens*. Oprimir las teclas:
  - `ctrl+shift+.` (punto) para seleccionar el siguiente *token*.
  - `ctrl+shift+,` (coma) para seleccionar el  *token* anterior.
- Con un número seleccionado, al oprimir las teclas `ctrl+shift+1,2,3...` se reemplaza el número por una función del tiempo tal como  `()=>f(time)`
        
     
## Description

- selecting tokens, Press:
  - `ctrl+shift+,` (comma) will select previous token
  - `ctrl+shift+.` (Period) will select next token
- When a number is selected pressing `ctrl+shift+1,2,3...` will change the number by functions of time as `()=>f(time)`

## uso
Ejecutá la siguiente línea de código en el [editor web hydra](https://hydra.ojack.xyz/)
## usage
Run the following line of code in [hydra web-editor](https://hydra.ojack.xyz/)

```js
await import("https://unpkg.com/hydracula")
```

## Clarification

Only works on [editor web hydra](https://hydra.ojack.xyz/) since it uses the `cm` CodeMirror globally exposed object/variable. This is: it won't work on `atom-hydra`.
        
## Aclaración

No funciona en atom-hydra porque depende de la variable globalmente expuesta `cm` donde está guardado el objeto editor `codemirror 5` que se usa en el [editor web hydra](https://hydra.ojack.xyz/).


## TODO:

add more functions

agregar más funciones

## Motivación

Una extension para [hydra web-editor](https://hydra.ojack.xyz/) compuesta durante el taller de la cinemateca de Bogotá, [Muestra de resultados: Taller de creación colectiva con live-coding y memoria audiovisual](https://cinematecadebogota.gov.co/actividad/muestra-resultados-taller-creacion-colectiva-live-coding-y-memoria). Remezcla y reinterpretación en vivo de los sonidos e imágenes en movimiento inspirados en el corto colombiano **¿Por qué se esconde Drácula?**(1980) de la directora **Camila Loboguerrero**