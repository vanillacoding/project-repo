export default function integrateCode(html, css, js) {
  return `<html><body>${html}</body><style>${css}</style><script>${js}</script></html>`;
}
