import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, FlatList, View, Text, Image } from 'react-native';
import Spinner from 'react-native-number-spinner';
import { ListItem } from 'react-native-elements';
import { email } from 'react-native-communications';
// import ImagePreview from 'react-native-image-preview';
import Modal from 'react-native-modal';
import { valueChanged, selectProduct } from '../actions';
// import { CardSection } from './common';

class ProductPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			productsArray: [],
			isModalVisible: false,
			selectedItem: {},
			orderedItemNameAndQuantity: [],
			orderedItemNameAndQuantityStr: ''
		};
	}

	componentWillMount() {
		const productsArray = [];
		for (var i in this.props.products) {
			console.log('this should be the key: ', i);
			console.log('i.NAME: ', i.ProductName);
			productsArray.push({ name: this.props.products[i].ProductName, value: 0 });
      // you can reference objects using arrays as well,
			// i.e. this.props['products'] = this.props.products,
		}
		this.setState({ productsArray }); // ES6 shorthand, aka equal to productsArray: productsArray
		console.log('Products array: ', productsArray);
	}

onValueChange(value, key) {
  // console.log('thirdArg: ', thirdArg);
  console.log('KEY IN onValueChange: ', key);
  this.props.valueChanged(value, key);
  console.log('VALUE: ', value);
  console.log('ONVALUECHANGE: ', this.state.productsArray);
}

onEmailSend = () => {
	const orderedItemNameAndQuantity = [];
	for (var i in this.props.products) {
		if (this.props.products[i].value !== 0) {
			orderedItemNameAndQuantity.push({
				name: this.props.products[i].name,
				quantity: this.props.products[i].value });
		}
		// array of products ordered
	  var orderedItemNameStr = orderedItemNameAndQuantity.map(function(order) {
			return order.name;
		}).join(', ');
		var orderedItemQuantityStr = orderedItemNameAndQuantity.map(function(order) {
			return order.quantity;
		}).join(', ');
		console.log('orderedItemNameAndQuantity: ', orderedItemNameAndQuantity);
		console.log('orderedItemNameAndQuantityStr: ', orderedItemNameStr);
		console.log('orderedItemQuantityStr: ', orderedItemQuantityStr);
		this.setState({ orderedItemNameAndQuantity });
		this.setState({ orderedItemNameStr });
	}
	email([`${this.props.email}`],
		['ekavanagh@rockwater.net'],
		null,
		'Order Confirmation',
		`Delivery Address:
		${this.props.streetaddress}
		 ${this.props.city}, ${this.props.province} ${this.props.postalcode}

		${this.state.orderedItemNameStr}`);
}

selectItem(item) {
	this.setState({ selectedItem: item });
	this.setState({ isModalVisible: true });
	console.log('ITEM: ', item.value);
}

toggleModal = () => {
	console.log('toggleModalCalled');
	this.setState({
		isModalVisible: !this.state.isModalVisible },
		() => console.log('isModalVisible: ', this.state.isModalVisible));
}


  render() {
    console.log('THIS.PROPS(ProductPage): ', this.props);
    console.log('PRODUCT NAME: ', this.props.ProductName);
    console.log('NAME: ', this.props.Name);
    console.log('VALUE: ', this.props.values);
    return (
      <View style={{ flex: 1, paddingTop: 60 }}>
				{/* quick test, your text was rendered under the header*/}
				<FlatList
					style={{ flex: 1 }}
					extraData={this.props.products} // when this value changes FlatList re-renders
					data={this.props.products}
					keyExtractor={(item) => item.name}
					renderItem={({ item }) => {
            return (
              <ListItem
              hideChevron
              titleNumberOfLines={2}
              onPress={() => this.selectItem(item)}
              title={
                  <View>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                      <Text
                        style={{
                          fontSize: 12,
                          flex: 0.8,
                          paddingTop: 10,
                          justifyContent: 'center' }}
                      >{item.name}</Text>
                      <View style={{ flex: 0.2, paddingRight: 10 }}>
                        <Spinner
                          min={0}
                          max={99}
                          width={80}
                          height={30}
                          default={0}
                          onNumChange={(value) => this.onValueChange(value, item.key)}
                          value={item.value}
                        />
                      </View>
                    </View>
										<Modal
										isVisible={this.state.isModalVisible}
										onBackdropPress={() => this.setState({ isModalVisible: false })}
										>
											<View style={{ justifyContent: 'center', alignItems: 'center' }}>
												<Image
												source={{
													uri: `${this.state.selectedItem.imageURL}`,
													width: 100,
													height: 235 }}
												/>
											</View>
										</Modal>
                  </View>
              }
              />
						);
					}}
				/>
        <Button
				title="Place Order"
				onPress={this.onEmailSend}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  const { products } = state.products;
  const { users } = state;
  const selected = state.selectedProductId;
  /* for (var i in products) {
    const expanded = state.selectedProductId === products[i].id;
      console.log('EXPANDED: ', expanded);
  } */
  return {
    products,
    selected,
  //  expanded,
		productName: products.name,
		productQuantity: products.value,
    email: users.Email,
    city: users.City,
    postalcode: users.PostalCode,
    province: users.Province,
    streetaddress: users.StreetAddress
  };
};
export default connect(mapStateToProps, { valueChanged, selectProduct })(ProductPage);
