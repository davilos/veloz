import React, { useEffect, useState } from "react"

import { View, Text, StyleSheet, Image, TouchableOpacity} from "react-native"

const PetItem = ({ pet }) => {
  return (
    <View style={styles.petItem}>
      <Text>{`Id: ${pet.id}`}</Text>
      <Text>{`Tipo: ${pet.type}`}</Text>
      <Text>{`Preço: $${pet.price}`}</Text>
    </View>
  );
};


export default function App() {
  const [data, setData] = useState(null);
  const [order, setOrder] = useState("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://petstore-demo-endpoint.execute-api.com/petstore/pets');

        if (!response.ok) {
          throw new Error('Não foi possível obter os dados');
        }

        const jsonData = await response.json();
        setData(jsonData);

      } catch (error) {
        console.error('Erro ao obter os dados:', error);
      }
    };

    fetchData();
  }, []);

  const orderBy = (field) => {

    const sortById = (data) => {
      return [...data].sort((a, b) => a.id - b.id);
    };
  
    const sortByType = (data) => {
      return [...data].sort((a, b) => a.type.localeCompare(b.type));
    };
  
    const sortByPrice = (data) => {
      return [...data].sort((a, b) => a.price - b.price);
    };
    
    if (field === 'id') {
      sortedData = sortById(data);
    } else if (field === 'type') {
      sortedData = sortByType(data);
    } else if (field === 'price') {
      sortedData = sortByPrice(data);
    }

    setData(sortedData);

  };

  return(
    <View style={styles.container}>

      <View style={styles.area}>
        <Image
          source={require("./src/assets/icon.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>Pet Store</Text>
      </View>

      <View style={styles.dataArea}>
        {data ? (
          data.map((pet) => <PetItem key={pet.id} pet={pet} />)
        ) : (
          <Text style={{ color: "white", textAlign: "center" }}>Carregando dados...</Text>
        )}
      </View>

      <View>

        <TouchableOpacity style={styles.button} onPress={() => orderBy('id')}>
          <Text style={styles.buttonText}>Ordenar pelo id</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => orderBy('type')}>
          <Text style={styles.buttonText}>Ordenar pelo tipo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => orderBy('price')}>
          <Text style={styles.buttonText}>Ordenar pelo preço</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: "#F3F3FF",
    justifyContent: "center",
    alignItems: "center"
  },
  logo:{
    width: 150, 
    height: 150,
    marginBottom: 20,
  },
  title:{
    fontSize: 20,
    fontWeight: "bold"
  },
  area:{
    marginTop: 14,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
    justifyContent: "center"
  },
  dataArea:{
    backgroundColor: "black",
    marginBottom: 20,
    width: "80%",
    height: "40%",
    justifyContent: "center",
    borderWidth: 10
  },
  button:{
    backgroundColor: "#00bfff",
    height: 50,
    width: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    marginBottom: 18,
    flexDirection: "column-reverse"
  },
  buttonText:{
    color: "#FFF",
    fontSize: 15,
  },
  petItem: {
    backgroundColor: "#F3F3FF",
    padding: 10,
    marginBottom: 10,
  }
})