// Libs
import { useRef } from 'react';

// Css
import './Product.css';

// Components
import Button from '@/components/common/Button/Button.jsx';

function Product ({ filtroProduto, OnAdd, claro }) {

    // Carrossel
    const carrosselRef = useRef(null);

    // Avançar ou voltar no carrossel
    function MoverCarrossel (direcao) {
        if (carrosselRef.current) {
            const largura = carrosselRef.current.clientWidth;

            carrosselRef.current.scrollBy({
                left: largura * direcao,
                behavior: 'smooth'
            });
        }
    }

    return (
        <div className="carrossel">

            <button
                aria-label='Produtos Anteriores'
                className='seta-carrossel'
                onClick={() => MoverCarrossel(-1)}
            >
                &#10094;
            </button>

            <div className="containerproduct" ref={carrosselRef}>
                {filtroProduto.map((produto) => (
                    <div className={claro ? `container${produto.categoria}Claro` : `container${produto.categoria}Escuro`} key={produto.id} style={produto.estoque == 0 ? {opacity: 0.5} : {opacity: 1}}>
                        <img src={produto.imagem ?? produto.imagem} className='imagemproduto' alt={produto.imagem ? produto.produto : 'Produto sem imagem'} title={produto.produto} />
                        <h2 style={{textAlign: 'center'}}>{produto.produto}</h2>
                        {produto.preco == 0 ? <p style={{color: 'green'}}>Grátis!</p> : <p>R$ {produto.preco.toFixed(2).replace(".", ",")}</p>}
                        <p>Categoria: <b id={produto.categoria}>{produto.categoria}</b></p>
                        {produto.estoque == 0 ? <p style={{color: 'red'}}>Produto indisponível</p> : <p style={{color: 'green', fontWeight: 700}}>{produto.estoque} disponíveis</p>}
                        {produto.estoque == 0 ? <a href="#"><Button title='ADICIONAR AO CARRINHO' classe='unavailable'/></a> : <a href="#cart"><Button title='ADICIONAR AO CARRINHO' funcao={() => OnAdd(produto)} classe='button'/></a>}
                    </div>
                ))}
            </div>

            <button
                aria-label='Próximos Produtos'
                className='seta-carrossel'
                onClick={() => MoverCarrossel(1)}
            >
                &#10095;
            </button>

        </div>
    )
}

export default Product;