<script setup lang="ts">
import { inject, onMounted, reactive, ref } from 'vue';
import Order from './domain/Order';
import CheckoutGateway from './infra/gateway/CheckoutGateway';
    const products =  reactive([
        { idProduct: 1, description: 'A', price: 1000 },
        { idProduct: 2, description: 'B', price: 5000 },
        { idProduct: 3, description: 'C', price: 30 },
    ])
    const order = reactive(new Order("772.801.132-49"));

    const getProductById = function (idProduct: number) {
        return products.find((product: any) => product.idProduct === idProduct);
    }

    const formatMoney = function (amount: number) {
        return new Intl.NumberFormat("en-IN", { style: "currency", currency: "USD"}).format(amount);
    }

    const message = ref("");

    const checkoutGateway = inject("checkoutGateway") as CheckoutGateway;

    const confirm = async function (order: any) {
        const orderData = await checkoutGateway.checkout(order);
        order.code = orderData.code;
        order.total = orderData.total;
        message.value = "Success";
    }

    onMounted(async() => {
        const productsData = await checkoutGateway.getProducts();
        products.push(...productsData);
    });

</script>

<template>
    <h1 class="title">Checkout</h1>
    <div v-for="product in products">
        <span class="product-description">{{ product.description }}</span>
        <span class="product-price">{{ formatMoney(product.price) }}</span>
        <button class="product-add-button" @click="order.addItem(product)">Add</button>
    </div>
    <div class="total">{{ formatMoney(order.getTotal()) }}</div>
    <div v-for="item in order.items">
        <span class="item-description">{{ getProductById(item.idProduct)?.description }}</span>
        <span class="item-quantity">{{ item.quantity }}</span>
        <button class="item-decrease-button" @click="order.decreaseItem(item.idProduct)">-</button>
        <button class="item-increase-button" @click="order.increaseItem(item.idProduct)">+</button>
    </div>
    <button class="confirm" @click="confirm(order)">confirm</button>
    <div class="message">{{ message }}</div>
    <div class="order-code">{{ order.code }}</div>
    <div class="order-total">{{ order.total }}</div>
</template>

<style scoped>
</style>
