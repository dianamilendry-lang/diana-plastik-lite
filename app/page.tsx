"use client";

import styles from "./page.module.css";
import {
  ShieldCheck, Leaf, PackageSearch, Apple, Coffee, PawPrint, Sparkles, HardHat,
  Package, ShoppingBag, Box, Droplets, Flame, Maximize, Archive, Shirt, GripHorizontal, FileMinus, Recycle,
  Info, Globe, Layers, TrendingUp
} from "lucide-react";
import Image from "next/image";
import AIChatWidget from "./components/AIChatWidget";

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroBg}></div>
        <div className={styles.heroContent}>
          <div className={styles.badge}>Innovación en Empaques</div>
          <h1 className={styles.title}>Protección Superior para tus Productos</h1>
          <p className={styles.subtitle}>
            PlastiK LITE ofrece empaques plásticos flexibles premium diseñados para maximizar la durabilidad,
            minimizar el impacto ambiental y destacar tu marca en el mercado.
          </p>
          <button
            className={styles.primaryButton}
            onClick={() => window.dispatchEvent(new CustomEvent("open-chat"))}
          >
            Cotiza Ahora
          </button>
        </div>
      </section>

      <section className={styles.features} style={{ background: 'var(--background)' }}>
        <h2 className={styles.sectionTitle}>El Valor de los Empaques Flexibles</h2>
        <p className={styles.subtitle} style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 4rem auto' }}>
          La revolución en protección y logística que está transformando las cadenas de suministro a nivel mundial.
        </p>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}><Info size={32} /></div>
            <h3 className={styles.cardTitle}>¿Qué son?</h3>
            <p className={styles.cardText}>
              Son estructuras plásticas fabricadas a partir de materiales fácilmente moldeables, típicamente multicapa, combinando polímeros para obtener barreras específicas sin rigidez estructural.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}><Globe size={32} /></div>
            <h3 className={styles.cardTitle}>Su Importancia</h3>
            <p className={styles.cardText}>
              Optimizan el almacenamiento, reducen drásticamente los costos de transporte por su bajo peso frente al vidrio o metal, y disminuyen la huella de carbono de la logística general.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}><Layers size={32} /></div>
            <h3 className={styles.cardTitle}>Principales Usos</h3>
            <p className={styles.cardText}>
              Fundamentales para envasar alimentos, líquidos, cosméticos y productos médicos. Aportan hermeticidad, permiten esterilización y evitan eficientemente la contaminación cruzada.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}><TrendingUp size={32} /></div>
            <h3 className={styles.cardTitle}>Tendencias de la Industria</h3>
            <p className={styles.cardText}>
              Transición vital hacia diseños monomateriales reciclables, bioplásticos compostables, incorporación universal de zippers resellables e impresión digital para series sustentables.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>¿Por qué elegir PlastiK LITE?</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <ShieldCheck size={32} />
            </div>
            <h3 className={styles.cardTitle}>Máxima Resistencia</h3>
            <p className={styles.cardText}>
              Materiales coextruidos de alta barrera que garantizan la protección de tus productos contra humedad,
              oxígeno y luz, extendiendo su vida útil.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Leaf size={32} />
            </div>
            <h3 className={styles.cardTitle}>Eco-Amigables</h3>
            <p className={styles.cardText}>
              Comprometidos con el futuro. Nuestras líneas incluyen opciones biodegradables y materiales 100%
              reciclables para reducir tu huella de carbono.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <PackageSearch size={32} />
            </div>
            <h3 className={styles.cardTitle}>Diseño Personalizado</h3>
            <p className={styles.cardText}>
              Desde doypack hasta pouches con zipper. Impresión flexográfica de alta definición para que tu producto
              destaque en cualquier anaquel.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.products}>
        <h2 className={styles.sectionTitle}>Nuestras Soluciones Flexibles</h2>
        <div className={styles.grid}>
          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/pouches.png" alt="Empaques Doypack" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Empaques Doypack (Stand-Up)</h3>
              <p className={styles.cardText}>Bolsas flexibles tipo doypack ideales para granos, snacks y productos líquidos. Base estable para resaltar tu marca.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/bags.png" alt="Bolsas Plásticas Premium" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Bolsas Plásticas Premium</h3>
              <p className={styles.cardText}>Bolsas multicapa lisas e impresas a la medida con alta barrera de protección y acabados mate o brillante.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/rolls.png" alt="Bobinas Plásticas" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Bobinas Plásticas Acostadas</h3>
              <p className={styles.cardText}>Rollo o película plástica para uso en máquinas de empaque automático horizontal (HFFS) o vertical (VFFS).</p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Soluciones por Industria</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Apple size={32} />
            </div>
            <h3 className={styles.cardTitle}>Alimentos</h3>
            <p className={styles.cardText}>
              Empaques asépticos y de alta barrera que preservan la frescura, el sabor y el valor nutricional de tus productos alimenticios.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Coffee size={32} />
            </div>
            <h3 className={styles.cardTitle}>Bebidas</h3>
            <p className={styles.cardText}>
              Soluciones resistentes y seguras con boquillas (spouts) ideales para jugos, lácteos y bebidas energéticas, previniendo derrames.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <PawPrint size={32} />
            </div>
            <h3 className={styles.cardTitle}>Mascotas</h3>
            <p className={styles.cardText}>
              Empaques de fondo plano y cierres herméticos para croquetas y alimentos húmedos, maximizando la durabilidad y conteniendo aromas.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <Sparkles size={32} />
            </div>
            <h3 className={styles.cardTitle}>Cuidado del Hogar</h3>
            <p className={styles.cardText}>
              Empaques robustos diseñados para soportar químicos de detergentes, suavizantes y limpiadores sin perder la integridad del diseño.
            </p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrapper}>
              <HardHat size={32} />
            </div>
            <h3 className={styles.cardTitle}>Construcción</h3>
            <p className={styles.cardText}>
              Sacos industriales y películas de alta resistencia al rasgado y punzonado, perfectos para cemento, yeso, arenas y asfalto en frío.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>Catálogo por Tipo de Empaque</h2>
        <p className={styles.subtitle} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
          Esenciales para comercio, empaque de alimentos y gestión de residuos.
        </p>
        <div className={styles.grid} style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/rolls.png" alt="Bobinas" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Bobinas</h3>
              <p className={styles.cardText}>Rollos o películas plásticas para máquinas de empaque automático de alta velocidad.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/pouches.png" alt="Doypack (Stand-up)" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Doypack (Stand-up)</h3>
              <p className={styles.cardText}>Bolsas que se sostienen por sí solas, perfectas para anaquel con opciones de zipper resellable.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/bags.png" alt="Bolsas Cuadradas" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Bolsas Cuadradas</h3>
              <p className={styles.cardText}>Base plana tipo caja que otorga máxima capacidad y exhibición de marca en sus 4 lados.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/sachets.png" alt="Sachets" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Sachets</h3>
              <p className={styles.cardText}>Empaques monodosis compactos para muestras, salsas, líquidos, polvos o geles.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/shrink.png" alt="Termoencogibles" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Termoencogibles</h3>
              <p className={styles.cardText}>Películas que se ajustan mediante calor a la forma de tu producto para una protección estricta.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/flowpack.png" alt="Bolsas Flowpack" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Bolsas Flowpack</h3>
              <p className={styles.cardText}>Empaque tipo almohada para envasado económico y de alta velocidad de sólidos o snacks.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/pouches.png" alt="Pouches" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Pouches</h3>
              <p className={styles.cardText}>Versátiles y resistentes empaques flexibles multicapa para aplicaciones industriales o alimenticias.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/tshirt_bag.png" alt="Tipo Camiseta" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Tipo Camiseta</h3>
              <p className={styles.cardText}>Las clásicas bolsas para supermercados, de alta resistencia y con opción reciclable.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/die_cut_bag.png" alt="Asa Troquelada" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Asa Troquelada</h3>
              <p className={styles.cardText}>Bolsas con agarradera integrada en el propio material, aportando un diseño limpio y boutique.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/flat_bag.png" alt="Bolsas Planas" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Bolsas Planas</h3>
              <p className={styles.cardText}>Prácticos sobres o bolsas de 3 sellos laterales. Solución frecuente para recambios y empaque al vacío.</p>
            </div>
          </div>

          <div className={styles.productCard}>
            <div className={styles.productImageWrapper}>
              <Image src="/eco_bag.png" alt="Eco, Bio & Reutilizables" fill className={styles.productImage} />
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.cardTitle}>Eco, Bio & Reutilizables</h3>
              <p className={styles.cardText}>Alternativas compostables o de material de alta densidad reutilizable para gestión de residuos.</p>
            </div>
          </div>
        </div>
      </section>


      <footer className={styles.footer}>
        <p>© {new Date().getFullYear()} PlastiK LITE. Todos los derechos reservados.</p>
      </footer>

      <AIChatWidget />
    </main>
  );
}
