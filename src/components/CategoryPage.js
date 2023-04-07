import { useSelector } from "react-redux";

const CategoryPage = ({ categoryId }) => {
    const products = useSelector((state) => state.products.products);
    const filteredProducts = products.filter((product) => product.categoryId === categoryId);

    return (
        <div>
            <h2>Category {categoryId}</h2>
            <ul>
                {filteredProducts.map((product) => (
                    <li key={product.id}>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <span>{product.price}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CategoryPage;
