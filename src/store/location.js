const { locations } = require("#constants");
const { create } = require("zustand");
const { immer } = require("zustand/middleware/immer");

const useLocationStore = create(immer(set => ({
    activeLocation: locations.work
})))