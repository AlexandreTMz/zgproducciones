import React, { useEffect, useState } from 'react';
import { View } from 'react-native'
import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from 'react-native-vector-icons/Ionicons';
// DRAWER CUSTOM
import CustomDrawerContent from './../componentes/drawer/drawertcustom'

// Paes from supervisor
import { UsuarioSupervisor } from './../pages/supervisor/index';
import { PerfilSupervisor } from './../pages/supervisor/perfil';
import { Persona } from './../pages/supervisor/persona';
import { Operaciones } from './../pages/supervisor/operaciones';
import { ReporteVentas } from './../pages/supervisor/reporte';

// Paes from vendedor
import { UsuarioVendedor } from './../pages/vendedor/index';
import { PerfilVendedor } from './../pages/vendedor/perfil';
import { CuotaDiaria } from './../pages/vendedor/cuotaDiaria';
import { ReporteCuotaDiaria } from './../pages/vendedor/reporteCuota';

//get data
import { getData } from './../config/token'
import { VersusPersona } from '../pages/supervisor/versusPersona';
import { VersusCiudad } from '../pages/supervisor/versusCiudad';
import { Ubicacion } from '../pages/supervisor/ubicacion';
import { ReporteCuotaDiariaSup } from '../pages/supervisor/reporteCuotaSup';

const ProfileStack = createDrawerNavigator();
const ProfileStackScreen = (props) => {

  const [isLogen, setIsLogen] = React.useState(false)
  const [type, setType] = React.useState()

  useEffect(() => {
    const asyncFunctionData = async () => {
      try {
        const userDATA = await getData();
        if (userDATA) {
          setType(userDATA.us_tipo)
          setIsLogen(true)
          //console.log(userDATA)
        } else {
          setIsLogen(false)
        }
      } catch (e) {
        setIsLogen(false)
        //console.log(e)
      }
    }
    asyncFunctionData();
    return () => {
      console.log("This will be logged on unmount");
    }
  }, []);

  const pagesForUser = [
    {
      tipo: 2,
      componente: UsuarioVendedor,
      name: "Inicio",
      key: "inicio",
      icon: "home"
    },
    {
      tipo: 1,
      componente: PerfilSupervisor,
      name: "Perfil Supervisor",
      key: "perfilSupervisor",
      icon: "people"
    },
    {
      tipo: 1,
      componente: Persona,
      name: "Agregar persona",
      key: "persona",
      icon: "people"
    },
    {
      tipo: 1,
      componente: Operaciones,
      name: "Operaciones",
      key: "cuotas",
      icon: "people"
    },
    {
      tipo: 1,
      componente: ReporteVentas,
      name: "Reportes",
      key: "reporteventa",
      icon: "people"
    },
    {
      tipo: 1,
      componente: VersusPersona,
      name: "Comparar ventas",
      key: "ventascomp",
      icon: "people"
    },
    {
      tipo: 1,
      componente: VersusCiudad,
      name: "Comparar ciudades",
      key: "ventasciud",
      icon: "people"
    },
    {
      tipo: 1,
      componente: UsuarioSupervisor,
      name: "Superviosr",
      key: "supervisor",
      icon: "people"
    },
    {
      tipo: 2,
      componente: PerfilVendedor,
      name: "Perfil",
      key: "perfilVendedor",
      icon: "people"
    },
    {
      tipo: 2,
      componente: CuotaDiaria,
      name: "Cuota diaria",
      key: "cuetaDiaria",
      icon: "people"
    },
    {
      tipo: 2,
      componente: ReporteCuotaDiaria,
      name: "Reporte Cuota",
      key: "reporteCuota",
      icon: "people"
    }
  ]

  const allowPages = pagesForUser.filter(item => item.tipo !== parseInt(type));


  const addIconReturn = (icon) => {
    let data = {
      drawerIcon: (config) => {
        <Icon
          size={23}
          name={icon}
          color={'#7ed6df'}
        >
        </Icon>
      }
    }
    return data
  }

  const colorIconAct = "#ff7675";
  const colorIconIct = "#636e72";

  const userSupervisor = () => (
    <ProfileStack.Navigator
      labelStyle={{
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold'
      }}
      drawerContentOptions={{
        activeBackgroundColor: "#F1F1F1",
        activeTintColor: "#000000",
        inactiveTintColor: "#818181",
        itemStyle: {
          marginLeft: 0,
          paddingHorizontal: 10,
          width: '100%',
          borderRadius: 0
        }
      }}
      indicatorStyle={{
        borderBottomWidth: 2,
        borderBottomColor: 'red',
      }}
      drawerContent={
        (props) => <CustomDrawerContent props={props} setIsLogen={1} />
      }
    >
      <ProfileStack.Screen key={"supervisor"} name={"Home"} component={UsuarioSupervisor}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"home"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"perfilSupervisor"} name={"Perfil Supervisor"} component={PerfilSupervisor}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"people"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"persona"} name={"Agregar persona"} component={Persona}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"people"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"cuotas"} name={"Operaciones"} component={Operaciones}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"bar-chart"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"reporteventa"} name={"Reportes venta"} component={ReporteVentas}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"archive"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"reportevendedor"} name={"Reporte cuota"} component={ReporteCuotaDiariaSup}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"barcode"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"ventascomp"} name={"Comparar ventas"} component={VersusPersona}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"cash-outline"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"ventasciud"} name={"Comparar ciudades"} component={VersusCiudad}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"globe-outline"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"ubicacion"} name={"Ubicacion"} component={Ubicacion}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"golf"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
    </ProfileStack.Navigator>
  )

  const userVendedor = () => (
    <ProfileStack.Navigator
      labelStyle={{
        fontSize: 14,
        fontFamily: 'OpenSans-SemiBold'
      }}
      drawerContentOptions={{
        activeBackgroundColor: "#F1F1F1",
        activeTintColor: "#000000",
        inactiveTintColor: "#818181",
        itemStyle: {
          marginLeft: 0,
          paddingHorizontal: 10,
          width: '100%',
          borderRadius: 0
        }
      }}
      indicatorStyle={{
        borderBottomWidth: 2,
        borderBottomColor: 'red',
      }}
      drawerContent={
        (props) => <CustomDrawerContent props={props} setIsLogen={1} />
      }
    >
      <ProfileStack.Screen key={"vendedor"} name={"Home"} component={UsuarioVendedor}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"home"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"perfilVendedor"} name={"Perfil Vendedor"} component={PerfilVendedor}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"people"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"cuetaDiaria"} name={"Cuota diaria"} component={CuotaDiaria}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"location"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
      <ProfileStack.Screen key={"reporteCuota"} name={"Reporte Cuota"} component={ReporteCuotaDiaria}
        options={
          {
            drawerIcon: ({ focused, size }) =>
              <Icon
                size={23}
                name={"layers"}
                color={(focused) ? colorIconAct : colorIconIct}
              >
              </Icon>
          }
        }
      />
    </ProfileStack.Navigator>
  )
  return (
    parseInt(type) === 1 ? userSupervisor() : userVendedor()
  )
};

export default ProfileStackScreen