import { mount } from "@vue/test-utils";
import AppVue from "../src/App.vue";
import Product from "../src/domain/Product";
import CheckoutGateway from "../src/infra/gateway/CheckoutGateway";
import ICheckoutGateway from "../src/infra/gateway/ICheckoutGateway";
import AxiosAdapter from "../src/infra/http/AxiosAdapter";

function sleep (time: number) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(true);
        }, time)
    })
}

test("Deve ter um pedido sem nenhum item", async function() {
    const checkoutGateway = new CheckoutGateway(new AxiosAdapter(), "http://localhost:3000");
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });
    expect(wrapper.get(".title").text()).toBe("Checkout");
    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe("A");
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe("$1,000.00");
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe("B");
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe("$5,000.00");
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe("C");
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe("$30.00");
    expect(wrapper.get('.total').text()).toBe("$0.00");
});

test("Deve ter um pedido somente com um item", async function() {
    const checkoutGateway = new CheckoutGateway(new AxiosAdapter(), "http://localhost:3000");
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });
    await wrapper.findAll('.product-add-button').at(0)?.trigger("click");
    expect(wrapper.get('.total').text()).toBe("$1,000.00");
    expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
});

test("Deve ter um pedido com varios itens e quantidade acima de 1", async function() {
    const checkoutGateway = new CheckoutGateway(new AxiosAdapter(), "http://localhost:3000");
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });
    await wrapper.findAll('.product-add-button').at(0)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(1)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(2)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(2)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(2)?.trigger("click");
    expect(wrapper.get('.total').text()).toBe("$6,090.00");
    expect(wrapper.findAll(".item-description").at(0)?.text()).toBe("A");
    expect(wrapper.findAll(".item-description").at(1)?.text()).toBe("B");
    expect(wrapper.findAll(".item-description").at(2)?.text()).toBe("C");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
    expect(wrapper.findAll(".item-quantity").at(1)?.text()).toBe("1");
    expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("3");
});

test("Deve ter um pedido com varios itens e decrementar quantidade do item do pedido", async function() {
    const checkoutGateway = new CheckoutGateway(new AxiosAdapter(), "http://localhost:3000");
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });
    await wrapper.findAll('.product-add-button').at(0)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(1)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(2)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(2)?.trigger("click");
    await wrapper.findAll('.product-add-button').at(2)?.trigger("click");
    await wrapper.findAll('.item-decrease-button').at(2)?.trigger("click");
    await wrapper.findAll('.item-decrease-button').at(2)?.trigger("click");
    expect(wrapper.get('.total').text()).toBe("$6,030.00");
    expect(wrapper.findAll(".item-quantity").at(2)?.text()).toBe("1");
});

test("Deve ter um pedido com varios itens e incrementar quantidade do item do pedido", async function() {
    const checkoutGateway = new CheckoutGateway(new AxiosAdapter(), "http://localhost:3000");
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });
    await wrapper.findAll('.product-add-button').at(0)?.trigger("click");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("1");
    expect(wrapper.get('.total').text()).toBe("$1,000.00");
    await wrapper.findAll('.item-increase-button').at(0)?.trigger("click");
    await wrapper.findAll('.item-increase-button').at(0)?.trigger("click");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBe("3");
    expect(wrapper.get('.total').text()).toBe("$3,000.00");

});

test("Deve ter um pedido com varios itens e decrementar quantidade do item do pedido e não pode permitir que seja menor que zero", async function() {
    const checkoutGateway = new CheckoutGateway(new AxiosAdapter(), "http://localhost:3000");
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });
    await wrapper.findAll('.product-add-button').at(0)?.trigger("click");
    await wrapper.findAll('.item-decrease-button').at(0)?.trigger("click");
    await wrapper.findAll('.item-decrease-button').at(0)?.trigger("click");
    expect(wrapper.findAll(".item-quantity").at(0)?.text()).toBeUndefined();
    expect(wrapper.get('.total').text()).toBe("$0.00");
});

test("Deve confirmar um pedido", async function() {
    const checkoutGateway: ICheckoutGateway = {
        async getProducts (): Promise<Product[]> {
            return [
                { idProduct: 4, description: 'D', price: 1000 }
            ]
        },
        async checkout(input: any): Promise<any> {
            return {
                code: "202300000001",
                total: 1030
            }
        }
    }
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });    
    await wrapper.findAll('.product-add-button').at(0)?.trigger("click");
    await wrapper.get('.confirm').trigger("click");
    await sleep(100);
    expect(wrapper.get('.message').text()).toBe("Success");
    expect(wrapper.get('.order-code').text()).toBe("202300000001");
    expect(wrapper.get('.order-total').text()).toBe('1030');
});

test("Deve ter um pedido com 4 itens", async function() {
    const checkoutGateway: ICheckoutGateway = {
        async getProducts (): Promise<Product[]> {
            return [
                { idProduct: 4, description: 'D', price: 1000 }
            ]
        },
        async checkout(input: any): Promise<any> {
            return {
                code: "202300000001",
                total: 1030
            }
        }
    }
    const wrapper = mount(AppVue, {
        global: {
            provide: {
                checkoutGateway
            }
        }
    });    
    await sleep(100);
    expect(wrapper.get(".title").text()).toBe("Checkout");
    expect(wrapper.findAll('.product-description').at(0)?.text()).toBe("A");
    expect(wrapper.findAll('.product-price').at(0)?.text()).toBe("$1,000.00");
    expect(wrapper.findAll('.product-description').at(1)?.text()).toBe("B");
    expect(wrapper.findAll('.product-price').at(1)?.text()).toBe("$5,000.00");
    expect(wrapper.findAll('.product-description').at(2)?.text()).toBe("C");
    expect(wrapper.findAll('.product-price').at(2)?.text()).toBe("$30.00");
    expect(wrapper.findAll('.product-description').at(3)?.text()).toBe("D");
    expect(wrapper.findAll('.product-price').at(3)?.text()).toBe("$1,000.00");
});