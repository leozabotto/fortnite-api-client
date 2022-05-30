/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';

import {
  Select, Button, Preloader, Toast,
} from 'react-materialize';
import axios from 'axios';
import Template from '../components/Template';

import bananaImg from '../assets/img/fortnite-banana.png';

import './Catalog.css';

export default function Catalog() {
  const [section, setSection] = useState('ALL');
  const [loading, setLoading] = useState(true);

  const [lastUpdated, setLastUpdated] = useState(null);

  const [store, setStore] = useState({});

  function getColorByRarity({ value }) {
    switch (value) {
      case 'epic':
        return 'purple';
      case 'legendary':
        return 'orange';
      case 'rare':
        return 'blue';
      case 'uncommon':
        return 'green';
      case 'common':
        return 'grey';
      default:
        return 'lightblue';
    }
  }

  async function getStoreItems() {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://fortnite-api.com/v2/shop/br/combined?language=pt-BR',
      );

      setStore(response.data.data);
      setLastUpdated(new Date());
      setLoading(false);
    } catch (err) {
      // eslint-disable-next-line no-alert
      alert(`Ocorreu um erro ao buscar os dados da loja. ${err.message}`);
    }
  }

  useEffect(() => {
    getStoreItems();
  }, []);

  return (
    <Template>
      <div className="greetings">
        <img src={bananaImg} alt="Banana" />
        <p>
          <b>Olá, seja bem-vindo(a)!</b>
        </p>
      </div>

      <div className="form">
        <div className="field">
          <Select
            label="Seções"
            multiple={false}
            onChange={(e) => setSection(e.target.value)}
            style={{ color: "red" }}
            options={{
              classes: "",
              dropdownOptions: {
                alignment: "left",
                autoTrigger: true,
                closeOnClick: true,
                constrainWidth: true,
                coverTrigger: true,
                hover: false,
                inDuration: 150,
                onCloseEnd: null,
                onCloseStart: null,
                onOpenEnd: null,
                onOpenStart: null,
                outDuration: 250,
              },
            }}
            value={section}
          >
            <option disabled value="">
              Selecione
            </option>
            <option value="ALL">Todas</option>
            <option value="DAILY">Diária</option>
            <option value="FEATURED">Destaques</option>
          </Select>
        </div>
        <div className="field">
          <Button className="blue darken-3" onClick={() => getStoreItems()}>
            Atualizar loja
          </Button>
        </div>
      </div>

      <div className="catalog">
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Preloader active flashing={false} size="small" />
          </div>
        ) : (
          <>
            <p style={{ textAlign: "center" }}>
              <b>Última atualização:</b>&nbsp;
              {`${lastUpdated.toLocaleDateString("pt-br")} às ${lastUpdated.toLocaleTimeString("pt-br")}`}
            </p>
            {section !== "FEATURED" ? (
              <>
                <p
                  style={{
                    fontSize: "30px",
                    marginLeft: "20px",
                  }}
                >
                  Diária
                  <hr />
                </p>
                <div className="catalog-grid">
                  {store.daily?.entries?.map((entry) => (
                    <div className="catalog-item">
                      <div className="subitems">
                        {entry.items.map((item) => (
                          <div className="individual-subitem">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: getColorByRarity(item.rarity),
                              }}
                            >
                              <img
                                src={item.images.smallIcon}
                                alt={item.name}
                                width="128px"
                              />
                            </div>

                            <p className="center">{item.name}</p>
                          </div>
                        ))}
                      </div>
                      <p className="item-price">
                        <img src={store.vbuckIcon} alt="v-bucks" width="25px" />
                        &nbsp;
                        {entry.regularPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}

            {section !== "DAILY" ? (
              <>
                <p
                  style={{
                    fontSize: "30px",
                    marginLeft: "20px",
                  }}
                >
                  Destaques e Ofertas Especiais
                  <hr />
                </p>
                <div className="catalog-grid">
                  {store.featured?.entries?.map((entry) => (
                    <div className="catalog-item">
                      <div className="subitems">
                        {entry.items.map((item) => (
                          <div className="individual-subitem">
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                backgroundColor: getColorByRarity(item.rarity),
                              }}
                            >
                              <img
                                src={item.images.smallIcon}
                                alt={item.name}
                                width="128px"
                              />
                            </div>

                            <p className="center">{item.name}</p>
                          </div>
                        ))}
                      </div>
                      <p className="item-price">
                        <img src={store.vbuckIcon} alt="v-bucks" width="25px" />
                        &nbsp;
                        {entry.regularPrice}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </Template>
  );
}
