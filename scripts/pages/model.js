class Model{
  constructor(){
    this.data = null
  }
  async getDatas() {
    if (this.data){
      console.log(this.data)
      return this.data
    }
    try {
      const response = await fetch("../../data/recipes.json");
      this.data = await response.json();
      if (this.data && Array.isArray(this.data.recipes)) {
        return this.data;
      } else {
        console.error("Les données ne sont pas au format attendu.");
      }
    } catch (error) {
      console.error("Erreur:", error);
    }
  };
};

