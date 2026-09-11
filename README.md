# Salvi Engenharia — Site Institucional

Projeto front-end estático pronto para abrir no VS Code.

## Estrutura
- `index.html` — conteúdo e estrutura do site
- `style.css` — identidade visual, responsividade e animações
- `script.js` — menu mobile, filtros do portfólio, modal de serviços, animações e formulário demonstrativo
- `assets/` — pasta para adicionar fotos, renders, logo e outros arquivos

## Como abrir no VS Code
1. Extraia a pasta/ZIP.
2. Abra a pasta `salvi-engenharia-site` no VS Code.
3. Abra `index.html` no navegador ou use a extensão **Live Server**.

## Onde adicionar imagens reais
No HTML, procure por `project-placeholder`. Você pode substituir cada bloco por uma tag como:

```html
<img src="assets/fachada-01.jpg" alt="Projeto de fachada moderna da Salvi Engenharia">
```

Depois ajuste no CSS para `.portfolio-card img { width:100%; height:100%; object-fit:cover; display:block; }`.

## Contato / WhatsApp
O formulário atual é demonstrativo. Para publicar, ele pode ser conectado a:
- WhatsApp via link `https://wa.me/55DDDNUMERO`
- Formspree
- EmailJS
- backend próprio em PHP/Node

## Sugestão para próxima etapa
Enviar:
- logo da Salvi Engenharia
- telefone/WhatsApp
- e-mail
- cidade/região atendida
- CREA / responsável técnico (se quiser exibir)
- renders e fotos de obras
- redes sociais

Com isso, o layout pode ser finalizado com conteúdo 100% real.
