import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, TouchableOpacity, Modal, Pressable, Image } from 'react-native';

const moviesData = [
  { name: 'Star Wars', releaseDate: '1977-08-10', details: '1977-08-10' },
  { name: 'Back to the Future', releaseDate: '1985-06-14', details: '1985-06-14' },
  { name: 'The Matrix', releaseDate: '1999-03-30', details: '1999-03-30' },
];

const App = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
      date + '/' + month + '/' + year
      + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

  const handleLogin = () => {
    // Hardcoded email and password for two users
    const users = [
      { email: 'user1@example.com', password: 'password1', name: 'Rohit' },
      { email: 'user2@example.com', password: 'password2', name: '' },
    ];

    const user = users.find(user => user.email === email && user.password === password);

    if (user) {
      setLoggedInUser(user);
    } else {
      alert('Invalid email or password');
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    setEmail('');
    setPassword('');
  };

  const openModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeModal = () => {
    setSelectedMovie(null);
  };

  return (
    <View style={styles.container}>
      {loggedInUser ? (
        <View style={styles.welcomeContainer}>
          <Text style={styles.currTime}>
            {currentDate}
          </Text>
          <Text style={styles.welcomeText}>Welcome {loggedInUser.name || loggedInUser.email}</Text>
          <View style={styles.moviesContainer}>

            {moviesData.map((movie, index) => (
              <TouchableOpacity
                style={styles.box}
                key={index}
                onPress={() => openModal(movie)}
              >
                <Text style={styles.movie}>{movie.name}</Text>
                <Text style={styles.movie}>(Release Year: {movie.releaseDate})</Text>
              </TouchableOpacity>
            ))}
          </View>
          {/* <Button title="Logout" onPress={handleLogout} /> */}
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutBtn}>
            <Text style={styles.loginText}>LOGOUT </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.loginContainer}>
          <Image
            style={styles.image}
            source={require('./Img/LogImgCrop.jpg')} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
            autoCapitalize="none"
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
            secureTextEntry
          />
          {/* <Button title="Login" onPress={handleLogin} /> */}
          <TouchableOpacity
            onPress={handleLogin}
            style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN </Text>
          </TouchableOpacity>
        </View>
      )}

      <Modal
        animationType="slide"
        transparent={true}
        visible={selectedMovie !== null}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedMovie?.name}</Text>
            <Text style={styles.modalDetails}>{selectedMovie?.details}</Text>
            <Pressable style={styles.modalCloseButton} onPress={closeModal}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  loginContainer: {
    width: '100%',
  },
  welcomeContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '60%',
    marginBottom: 20
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderRadius: 40,
    textAlign: 'center',

  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
    marginLeft: '10%'
  },
  currTime: {
    fontSize: 20,
    marginBottom: 50,
    color: 'black'
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  moviesContainer: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  moviesHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#147274',
  },
  box: {
    borderColor: 'red',
    borderWidth: 1,
    padding: 20,
    marginBottom: 20,
    borderRadius: 10
  },
  movie: {
    marginBottom: 5,
    color: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalDetails: {
    marginBottom: 20,
  },
  modalCloseButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#2196F3',
  },
  modalCloseButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  logoutBtn: {
    width: 200,
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10,
  },
});

export default App;
