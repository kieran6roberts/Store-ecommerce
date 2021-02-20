import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";
import { generateItemKey } from "@/utils/generateItemKey";
import { IProductStorage } from "@/utils/storage";

export const mapCartStorage = (items: IProductStorage[] | null, hide: boolean): JSX.Element[] | null => items ? items.map(item => 
    <li 
    id={item.id}
    key={generateItemKey(item.name)}
    >
        <CartItem 
        category={item.category}
        description={item.description}
        hideEdit={hide}
        id={item.id}
        image={item.image}
        name={item.name}
        price={item.price}
        />
    </li>
    ) : null;