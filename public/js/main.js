export const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { 'Authorization': 'Bearer ' + token } : {};
};

// Exemplo de uso:
// fetch('/cardapio/novo', { method:'POST', headers: { 'Content-Type': 'application/json', ...getAuthHeaders() }, body: JSON.stringify({...}) })
