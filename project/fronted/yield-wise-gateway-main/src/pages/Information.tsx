import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Information = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-foreground mb-4">Agricultural Information</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive insights into modern farming practices and agricultural development
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">1. Harshit Godha & Avocado Farming in India</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-muted-foreground">
            <p>• Young entrepreneur from Bhopal, founder of Indo Israel Avocado.</p>
            <p>• Inspired by Israel's avocado exports; trained there to learn advanced techniques.</p>
            <p>• Converted 5 acres of barren land into a modern orchard with ₹50 lakh investment.</p>
            <p>• Imported high-quality, disease-resistant saplings from Israel.</p>
            <p>• Built a farming community through blogs, e-books, and social media.</p>
            <p>• Business model: sells saplings, provides consultancy, and offers a 100% buyback guarantee.</p>
            <p>• Revenue crossed ₹1 crore by 2023; vision to scale to 100 acres and reduce avocado imports.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">2. Comparative Agriculture: India, USA, Israel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">India</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• Small fragmented farms (2–3 ha).</p>
                <p>• Labor-intensive, high monsoon dependency.</p>
                <p>• Mix of traditional and modern methods.</p>
                <p>• Lower yields; focus on food security and staples.</p>
                <p>• Challenges: water scarcity, price volatility, fragmented land.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">USA</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• Large farms (avg. 180+ ha).</p>
                <p>• Highly mechanized, capital-intensive.</p>
                <p>• Advanced tech: GPS, drones, GMOs, precision farming.</p>
                <p>• Very high yields, large global exporter.</p>
                <p>• Challenges: high input costs, soil/water pollution.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Israel</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• Kibbutz/private farms maximizing limited land.</p>
                <p>• Tech-driven: drip irrigation, greenhouses, fertigation, data-driven farming.</p>
                <p>• High yields despite 60% desert land.</p>
                <p>• Focus on high-value crops and exports.</p>
                <p>• Challenges: extreme water scarcity, limited arable land.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">3. Crop Overproduction in India</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Causes</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• MSP policy favors rice & wheat.</p>
                <p>• Subsidies (electricity, water, fertilizer) encourage water-intensive crops.</p>
                <p>• Weak procurement system for alternative crops.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Consequences</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• Economic: heavy fiscal burden, price crashes, storage losses.</p>
                <p>• Environmental: groundwater depletion, soil degradation, stubble burning → pollution.</p>
                <p>• Social/Nutritional: monocropping, imports of pulses/oilseeds, limited food diversity.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Solution Needed</h3>
              <p className="text-muted-foreground ml-4">Policy shift for diversification, rational subsidies, stronger markets.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary">4. Indian Farming Matrix & Role of Krishi Visesagya</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Indian Farming Overview</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• Types of farming: subsistence, commercial, plantation, organic.</p>
                <p>• Major crops: cereals, pulses, sugarcane, cotton, oilseeds, horticulture.</p>
                <p>• Tech adoption: HYV seeds, fertilizers, drones, digital tools.</p>
                <p>• Government schemes: PM-KISAN, RKVY, etc.</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Krishi Visesagya (Agri Expert)</h3>
              <div className="space-y-2 text-muted-foreground ml-4">
                <p>• Bridges research & farmers (via KVKs).</p>
                <p>• Provides training, demonstrations, and advisory services.</p>
                <p>• Promotes sustainable practices (organic, water-saving, diversification).</p>
                <p>• Helps farmers with market linkages and FPO formation.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Information;