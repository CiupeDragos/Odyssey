import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { LocationTypeEnum } from "../../../../util/enums";
import { Colors } from "../../../../util/constants";

type LocationCategoriesPickerProps = {
  categories: Array<LocationTypeEnum>;
  onUpdateCategories: (categories: Array<LocationTypeEnum>) => void;
};

function LocationCategoriesPicker({
  categories,
  onUpdateCategories,
}: LocationCategoriesPickerProps) {
  function handleCategoriesModification(category: LocationTypeEnum) {
    let updatedCategories: Array<LocationTypeEnum>;

    if (categories.includes(category)) {
      updatedCategories = categories.filter((c) => c !== category);
    } else {
      updatedCategories = [...categories, category];
    }

    onUpdateCategories(updatedCategories);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.labelText}>Location categories: </Text>
      <ScrollView
        contentContainerStyle={styles.categoriesContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {Object.values(LocationTypeEnum).map((category) => (
          <Pressable
            key={category}
            style={({ pressed }) => [
              styles.categoryView,
              pressed && styles.pressed,
              categories.includes(category) && styles.selectedCategory,
            ]}
            onPress={() => handleCategoriesModification(category)}
          >
            <Text style={styles.categoryText}>{category}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  categoriesContainer: {
    flexGrow: 1,
  },
  categoryView: {
    padding: 6,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: 120,
    height: 40,
    marginRight: 12,
    justifyContent: "center",
  },
  categoryText: {
    fontSize: 18,
    textAlign: "center",
  },
  labelText: {
    fontSize: 18,
    marginBottom: 4,
  },
  categoryPressable: {},
  pressed: {
    opacity: 0.7,
  },
  selectedCategory: {
    backgroundColor: Colors.secondary,
  },
});

export default LocationCategoriesPicker;
