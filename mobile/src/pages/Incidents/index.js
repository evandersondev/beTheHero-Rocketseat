import React, { useEffect, useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Button,
} from "react-native";
import api from "../../services/api";

import LogoImg from "../../assets/logo.png";
import styles from "./styles";

export default () => {
  const [incidents, setIncidents] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const navigateToDetail = (incident) => {
    navigation.navigate("Detail", { incident });
  };

  const loadIncidents = async () => {
    if (loading) {
      return;
    }

    if (total > 0 && incidents.length === total) {
      return;
    }

    setLoading(true);

    const { data, headers } = await api.get("incidents", {
      params: { page },
    });

    setIncidents([...incidents, ...data]);
    setTotal(headers["x-total-count"]);
    setPage(page + 1);
    setLoading(false);
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  return (
    <View style={styles.conatiner}>
      <View style={styles.header}>
        <Image source={LogoImg} />
        <Text style={styles.headerText}>
          Total of <Text style={styles.headerTextBold}>{total} cases.</Text>
        </Text>
      </View>

      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.description}>
        Choice one that's cases and saves the day.
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={(incident) => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>ONG:</Text>
            <Text style={styles.incidentValue}>{incident.name}</Text>

            <Text style={styles.incidentProperty}>CASO:</Text>
            <Text style={styles.incidentValue}>{incident.title}</Text>

            <Text style={styles.incidentProperty}>VALUE:</Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>Look more details</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};
