import { useState } from "react";
import api from "../config/api";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useState(() => {
    api
      .get('/home')
      .then((res) => {
        let dadosRetornados = res.data;

        setPosts(dadosRetornados);
      })
      .catch((error) => {
        console.log(error)
      });
  }, []);

  return (
    <div>
      <h2>Bem-vindo ao App Pindorama!</h2>
      <p>Aqui é possível verificar os próximos eventos beneficentes que ocorrerão!</p>
      <h2 className="text-center">Próximos Eventos</h2>
      {posts.length > 0 && (
        <div className="post-container">
          {posts.map((post) => {
            return (
              <div className="post">
                <div className="post-header post-content">{post.nome}</div>
                <div className="post-body post-content">{post.descricao}</div>
                <div className="post-footer post-content">De {post.data_hora_inicio} até {post.data_hora_fim}</div>
              </div>
            );
          })}
        </div>
      )}
      {posts.length <= 0 && <p className="text-center">Não há nenhum evento para os próximos dias.</p>}
    </div>
  );
}