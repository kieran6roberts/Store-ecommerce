import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";
import { generateItemKey } from "@/utils/generateItemKey";
import { IProductStorage } from "@/utils/storage";

export const mapCartStorage = (items: IProductStorage[] | null): JSX.Element[] | null => items ? items.map(item => 
    <li key={generateItemKey(item.name)}>
        <CartItem 
        category={item.category}
        description={item.description}
        hideEdit={true}
        id={item.id}
        name={item.name}
        price={item.price}
        />
    </li>
    ) : null;