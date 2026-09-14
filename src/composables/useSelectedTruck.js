import { ref } from 'vue'

// Shared reactive state for the currently selected truck id.
// HeroSection writes to it when a vehicle card is clicked;
// PricesSection reads it to apply the highlight class to the
// matching truck card after scroll-in.
const selectedTruckId = ref(null)

export function useSelectedTruck() {
  const setSelectedTruckId = (id) => {
    selectedTruckId.value = id
  }
  const clearSelectedTruckId = () => {
    selectedTruckId.value = null
  }
  return {
    selectedTruckId,
    setSelectedTruckId,
    clearSelectedTruckId,
  }
}
