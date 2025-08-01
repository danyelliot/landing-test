import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlockWithCopy from "../components/CodeBlockWithCopy"
import React from "react"
import TableOfContents from "../components/TableOfContents"

// Helper function to slugify text for IDs
const slugify = (text: string) => {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-")
}

// Define the structure of your Table of Contents for Blue Team
const tocItems = [
  {
    level: 2,
    text: "Introducción al Blue Team",
    id: slugify("Introducción al Blue Team"),
  },
  {
    level: 2,
    text: "Microsoft AZ-900: Azure Fundamentals",
    id: slugify("Microsoft AZ-900: Azure Fundamentals"),
    children: [
      { level: 3, text: "Conceptos Fundamentales de la Nube", id: slugify("Conceptos Fundamentales de la Nube") },
      {
        level: 3,
        text: "Arquitectura Física de Azure",
        id: slugify("Arquitectura Física de Azure"),
        children: [
          { level: 4, text: "Regiones y Geografías", id: slugify("Regiones y Geografías") },
          { level: 4, text: "Zonas de Disponibilidad", id: slugify("Zonas de Disponibilidad") },
          { level: 4, text: "Centros de Datos", id: slugify("Centros de Datos") },
        ],
      },
      {
        level: 3,
        text: "Arquitectura Lógica de Azure",
        id: slugify("Arquitectura Lógica de Azure"),
        children: [
          {
            level: 4,
            text: "Grupos de Administración y Suscripciones",
            id: slugify("Grupos de Administración y Suscripciones"),
          },
          { level: 4, text: "Grupos de Recursos", id: slugify("Grupos de Recursos") },
          { level: 4, text: "Azure Resource Manager (ARM)", id: slugify("Azure Resource Manager (ARM)") },
          { level: 4, text: "Redes Virtuales (VNets) y Subredes", id: slugify("Redes Virtuales (VNets) y Subredes") },
          { level: 4, text: "Grupos de Seguridad de Red (NSG)", id: slugify("Grupos de Seguridad de Red (NSG)") },
        ],
      },
      {
        level: 3,
        text: "Servicios Principales de Azure",
        id: slugify("Servicios Principales de Azure"),
        children: [
          { level: 4, text: "Cómputo", id: slugify("Cómputo") },
          { level: 4, text: "Redes", id: slugify("Redes") },
          { level: 4, text: "Almacenamiento", id: slugify("Almacenamiento") },
          { level: 4, text: "Bases de Datos", id: slugify("Bases de Datos") },
          { level: 4, text: "Identidad", id: slugify("Identidad") },
        ],
      },
      {
        level: 3,
        text: "Ciberseguridad en Azure",
        id: slugify("Ciberseguridad en Azure"),
        children: [
          {
            level: 4,
            text: "Modelo de Responsabilidad Compartida",
            id: slugify("Modelo de Responsabilidad Compartida"),
          },
          { level: 4, text: "Microsoft Defender for Cloud", id: slugify("Microsoft Defender for Cloud") },
          { level: 4, text: "Azure Firewall y WAF", id: slugify("Azure Firewall y WAF") },
          { level: 4, text: "Azure DDoS Protection", id: slugify("Azure DDoS Protection") },
          { level: 4, text: "Microsoft Sentinel", id: slugify("Microsoft Sentinel") },
          { level: 4, text: "Azure Key Vault", id: slugify("Azure Key Vault") },
          { level: 4, text: "Azure Policy y Blueprints", id: slugify("Azure Policy y Blueprints") },
        ],
      },
      {
        level: 3,
        text: "Gestión de Costos y Acuerdos de Nivel de Servicio (SLA)",
        id: slugify("Gestión de Costos y Acuerdos de Nivel de Servicio (SLA)"),
      },
    ],
  },
  {
    level: 2,
    text: "Microsoft SC-900: Security, Compliance, and Identity Fundamentals",
    id: slugify("Microsoft SC-900: Security, Compliance, and Identity Fundamentals"),
    children: [
      {
        level: 3,
        text: "Conceptos Fundamentales de Seguridad, Cumplimiento e Identidad",
        id: slugify("Conceptos Fundamentales de Seguridad, Cumplimiento e Identidad"),
      },
      {
        level: 3,
        text: "Soluciones de Identidad y Acceso de Microsoft",
        id: slugify("Soluciones de Identidad y Acceso de Microsoft"),
      },
      { level: 3, text: "Soluciones de Seguridad de Microsoft", id: slugify("Soluciones de Seguridad de Microsoft") },
      {
        level: 3,
        text: "Soluciones de Cumplimiento de Microsoft",
        id: slugify("Soluciones de Cumplimiento de Microsoft"),
      },
    ],
  },
  {
    level: 2,
    text: "Recursos Adicionales y Próximos Pasos",
    id: slugify("Recursos Adicionales y Próximos Pasos"),
  },
]

// Custom renderer for Markdown elements (same as Red Team page)
const components = {
  pre: ({ node, children }) => {
    const codeElement = React.Children.toArray(children)[0] as React.ReactElement | undefined

    if (
      codeElement &&
      codeElement.type === "code" &&
      typeof codeElement.props.className === "string" &&
      codeElement.props.className.startsWith("language-")
    ) {
      const language = codeElement.props.className.replace("language-", "")
      const codeContent = String(codeElement.props.children).trim()
      return <CodeBlockWithCopy language={language}>{codeContent}</CodeBlockWithCopy>
    } else {
      return (
        <pre className="bg-gray-800 text-gray-200 p-4 rounded-lg my-6 overflow-x-auto shadow-inner">{children}</pre>
      )
    }
  },
  code: ({ className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || "")
    return match ? (
      <code className="font-mono text-sm" {...props}>
        {children}
      </code>
    ) : (
      <code className="bg-gray-700 text-gray-100 px-1 py-0.5 rounded font-mono text-sm" {...props}>
        {children}
      </code>
    )
  },
  p: ({ children }) => <p className="mb-4 text-lg leading-relaxed text-foreground">{children}</p>,
  li: ({ children }) => <li className="mb-2 text-lg leading-relaxed text-foreground">{children}</li>,
  h1: ({ children }) => (
    <h1 id={slugify(String(children))} className="text-5xl font-bold mb-8 text-foreground">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2
      id={slugify(String(children))}
      className="text-4xl font-bold mb-6 text-foreground mt-10 border-b border-primary/20 pb-2"
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 id={slugify(String(children))} className="text-3xl font-semibold mb-4 text-foreground mt-8">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 id={slugify(String(children))} className="text-2xl font-medium mb-3 text-foreground mt-6">
      {children}
    </h4>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-6">{children}</blockquote>
  ),
}

// Content for the Blue Team page
const blueTeamContent = `
> **¡Bienvenido a la Masterclass de Introducción al Blue Team!**
> Esta guía está diseñada para proporcionarte una base sólida en ciberseguridad defensiva, enfocándose en las certificaciones fundamentales de Microsoft Azure: AZ-900 y SC-900. Aprenderás a proteger sistemas, detectar amenazas y asegurar entornos en la nube.

## Introducción al Blue Team
El Blue Team, o equipo azul, es el grupo de profesionales de ciberseguridad encargado de defender la infraestructura, sistemas y datos de una organización contra ataques. Su rol principal es la prevención, detección y respuesta a incidentes, asegurando la continuidad del negocio y la protección de activos críticos.

### Funciones Clave del Blue Team
*   **Monitoreo de Seguridad:** Vigilancia constante de redes y sistemas para detectar actividades sospechosas, utilizando herramientas SIEM (Security Information and Event Management) como Microsoft Sentinel.
*   **Análisis de Vulnerabilidades:** Identificación proactiva de debilidades en la infraestructura y aplicaciones, a menudo mediante escaneos automatizados y pruebas de penetración internas.
*   **Gestión de Incidentes:** Desarrollo e implementación de planes de respuesta a incidentes para contener, erradicar y recuperar sistemas después de una brecha de seguridad.
*   **Implementación de Controles:** Configuración y mantenimiento de herramientas y políticas de seguridad, incluyendo firewalls, sistemas de detección de intrusiones (IDS/IPS), y soluciones antivirus/EDR.
*   **Educación y Concienciación:** Capacitación del personal sobre las mejores prácticas de seguridad, como la identificación de ataques de phishing y la importancia de contraseñas seguras.
*   **Análisis Forense Digital:** Investigación de incidentes de seguridad para determinar la causa raíz, el alcance del daño y las acciones tomadas por los atacantes.

## Microsoft AZ-900: Azure Fundamentals
La certificación AZ-900 valida tu conocimiento fundamental sobre los servicios en la nube y cómo se implementan en Microsoft Azure. Es el punto de partida ideal para entender la infraestructura que el Blue Team debe proteger.

### Conceptos Fundamentales de la Nube
Comprende los modelos de la nube (IaaS, PaaS, SaaS), los beneficios y consideraciones de la computación en la nube, y los tipos de nube (pública, privada, híbrida).

*   **IaaS (Infrastructure as a Service):** Proporciona recursos de computación virtualizados a través de internet. Ejemplos en Azure: Máquinas Virtuales (VMs), Redes Virtuales (VNet), Almacenamiento. El usuario gestiona el sistema operativo, aplicaciones y datos.
*   **PaaS (Platform as a Service):** Ofrece un entorno completo para desarrollar, ejecutar y gestionar aplicaciones sin la complejidad de construir y mantener la infraestructura. Ejemplos en Azure: Azure App Service, Azure SQL Database.
*   **SaaS (Software as a Service):** Permite a los usuarios conectarse y usar aplicaciones basadas en la nube a través de internet. Ejemplos: Microsoft 365, Dynamics 365.
*   **Beneficios de la Nube:**
    *   **Agilidad:** Despliegue rápido de recursos.
    *   **Escalabilidad:** Capacidad de escalar recursos hacia arriba o hacia abajo según la demanda.
    *   **Elasticidad:** Ajuste automático de recursos para satisfacer cambios en la demanda.
    *   **Fiabilidad:** Alta disponibilidad y recuperación ante desastres.
    *   **Seguridad:** Inversión significativa de los proveedores en seguridad física y lógica.
    *   **Economía:** Modelo de pago por uso (Pay-as-you-go), reducción de gastos de capital (CapEx) a gastos operativos (OpEx).
*   **Tipos de Nube:**
    *   **Nube Pública:** Servicios ofrecidos por terceros proveedores a través de internet, disponibles para el público en general.
    *   **Nube Privada:** Infraestructura de nube operada exclusivamente para una sola organización, ya sea gestionada internamente o por un tercero.
    *   **Nube Híbrida:** Combina nubes públicas y privadas, permitiendo que los datos y las aplicaciones se muevan entre ellas.

![Diagrama de los modelos de servicio en la nube: IaaS, PaaS, SaaS](/public/images/blue-team/cloud-service-models.png)

### Arquitectura Física de Azure
La infraestructura global de Azure está diseñada para ofrecer alta disponibilidad, escalabilidad y redundancia. Comprender su estructura física es clave para diseñar soluciones robustas y seguras.

#### Regiones y Geografías
Una **Región** de Azure es un conjunto de centros de datos interconectados y cercanos entre sí, implementados dentro de una latencia definida. Cada región está diseñada para ser independiente de otras regiones, ofreciendo aislamiento de fallos. Las **Geografías** son áreas discretas del mundo que contienen una o más regiones de Azure, diseñadas para cumplir con los requisitos de residencia de datos y cumplimiento normativo.

![Diagrama de la infraestructura global de Azure mostrando geografías, regiones y zonas de disponibilidad](/public/images/blue-team/azure-global-infrastructure.png)

#### Zonas de Disponibilidad
Las **Zonas de Disponibilidad (Availability Zones)** son ubicaciones físicas separadas dentro de una región de Azure. Cada Zona de Disponibilidad consta de uno o más centros de datos equipados con energía, refrigeración y redes independientes. Esto proporciona aislamiento de fallos, lo que significa que si una zona falla, las otras continúan funcionando. Son ideales para aplicaciones de misión crítica que requieren alta disponibilidad.

#### Centros de Datos
Los **Centros de Datos** de Azure son instalaciones físicas que albergan miles de servidores y equipos de red. Están diseñados con redundancia en energía, refrigeración y conectividad de red para garantizar la continuidad del servicio.

### Arquitectura Lógica de Azure
La arquitectura lógica de Azure define cómo se organizan y gestionan los recursos dentro de la infraestructura física.

#### Grupos de Administración y Suscripciones
*   **Grupos de Administración (Management Groups):** Contenedores lógicos que permiten organizar suscripciones en una jerarquía para aplicar políticas y gobernanza a gran escala.
*   **Suscripciones:** Unidades de facturación y gestión en Azure. Los recursos se implementan dentro de una suscripción, y se aplican límites y cuotas.

#### Grupos de Recursos
Los **Grupos de Recursos (Resource Groups)** son contenedores lógicos para los recursos de Azure. Permiten agrupar recursos relacionados para una aplicación o proyecto, facilitando su gestión, monitoreo y eliminación como una sola unidad.

#### Azure Resource Manager (ARM)
**Azure Resource Manager (ARM)** es el servicio de implementación y gestión para Azure. Proporciona una capa de gestión que permite crear, actualizar y eliminar recursos en tu suscripción de Azure. Puedes usar plantillas ARM para implementar infraestructura como código (IaC).

#### Redes Virtuales (VNets) y Subredes
*   **Redes Virtuales (VNet):** Son el bloque de construcción fundamental para tu red privada en Azure. Una VNet te permite crear tu propia red aislada en la nube, donde puedes lanzar tus recursos de Azure.
*   **Subredes:** Segmentos de una VNet que permiten organizar y aislar recursos dentro de tu red virtual.

![Diagrama de Azure Virtual Network con múltiples subredes y recursos](/public/images/blue-team/azure-vnet-subnets.png)

#### Grupos de Seguridad de Red (NSG)
Los **Grupos de Seguridad de Red (NSG - Network Security Groups)** son filtros de tráfico de red que contienen una lista de reglas de seguridad que permiten o deniegan el tráfico de red hacia o desde los recursos de Azure en una VNet. Puedes asociar NSGs a subredes o a interfaces de red individuales.

### Servicios Principales de Azure
Azure ofrece una vasta gama de servicios para construir, implementar y gestionar aplicaciones y servicios.

#### Cómputo
*   **Máquinas Virtuales (VMs):** IaaS que permite ejecutar sistemas operativos y aplicaciones personalizadas en la nube.
*   **Azure App Service:** PaaS para construir, implementar y escalar aplicaciones web, móviles y API.
*   **Azure Functions:** Servicio de computación sin servidor (Serverless) para ejecutar código basado en eventos sin aprovisionar o gestionar infraestructura.
*   **Azure Kubernetes Service (AKS):** Servicio gestionado para desplegar y escalar aplicaciones en contenedores usando Kubernetes.

#### Redes
*   **Azure Load Balancer:** Distribuye el tráfico de red entre múltiples instancias de recursos para alta disponibilidad y rendimiento.
*   **Azure Application Gateway:** Un balanceador de carga de tráfico web que permite gestionar el tráfico a tus aplicaciones web. Incluye un Web Application Firewall (WAF).
*   **Azure VPN Gateway:** Permite crear conexiones seguras entre tu red local y Azure, o entre diferentes VNets.
*   **Azure ExpressRoute:** Crea una conexión privada y dedicada de alta velocidad entre tu red local y Azure.

#### Almacenamiento
*   **Azure Blob Storage:** Almacenamiento de objetos escalable para datos no estructurados (imágenes, videos, documentos, copias de seguridad).
*   **Azure File Storage:** Compartidos de archivos en la nube accesibles a través de SMB, que pueden ser montados por VMs locales o en la nube.
*   **Azure Disk Storage:** Almacenamiento de bloques persistente para Máquinas Virtuales de Azure.
*   **Azure Queue Storage:** Un servicio para almacenar grandes cantidades de mensajes de cola.
*   **Azure Table Storage:** Un servicio NoSQL para almacenar grandes cantidades de datos estructurados no relacionales.

#### Bases de Datos
*   **Azure SQL Database:** Base de datos relacional como servicio (PaaS) basada en SQL Server.
*   **Azure Cosmos DB:** Base de datos NoSQL distribuida globalmente y de baja latencia, compatible con múltiples APIs (MongoDB, Cassandra, Gremlin, Table, SQL).
*   **Azure Database for MySQL/PostgreSQL/MariaDB:** Servicios de bases de datos relacionales gestionadas para motores de código abierto.

#### Identidad
*   **Azure Active Directory (Azure AD):** El servicio de gestión de identidades y accesos basado en la nube de Microsoft. Permite a los usuarios iniciar sesión y acceder a recursos internos y externos. (Más detalles en SC-900).

### Ciberseguridad en Azure
La seguridad es una prioridad fundamental en Azure, con un enfoque en la protección de la infraestructura y los datos de los clientes.

#### Modelo de Responsabilidad Compartida
Este modelo define las responsabilidades de seguridad entre Microsoft (el proveedor de la nube) y el cliente.
*   **Microsoft es responsable de la seguridad *de* la nube:** Esto incluye la infraestructura física, la red host, el hipervisor y la capa de abstracción de la nube.
*   **El cliente es responsable de la seguridad *en* la nube:** Esto abarca los datos, las aplicaciones, el sistema operativo invitado, los controles de red y la configuración de la identidad. La responsabilidad del cliente varía según el modelo de servicio (IaaS, PaaS, SaaS).

![Diagrama del Modelo de Responsabilidad Compartida en la computación en la nube](/public/images/blue-team/shared-responsibility-model.jpg)

#### Microsoft Defender for Cloud
Anteriormente conocido como Azure Security Center, **Microsoft Defender for Cloud** es una solución de gestión de la postura de seguridad en la nube (CSPM) y protección de cargas de trabajo en la nube (CWPP) que proporciona una gestión unificada de la seguridad y protección avanzada contra amenazas en entornos híbridos y multinube.
*   **Puntuación Segura (Secure Score):** Una medida de la postura de seguridad de una organización, con recomendaciones priorizadas para mejorarla.
*   **Recomendaciones de Seguridad:** Sugerencias accionables para fortalecer la seguridad de tus recursos.
*   **Protección de Cargas de Trabajo:** Detección y respuesta a amenazas para VMs, contenedores, bases de datos, etc.

#### Azure Firewall y WAF
*   **Azure Firewall:** Un servicio de seguridad de red administrado y basado en la nube que protege los recursos de Azure Virtual Network. Es un firewall de estado que puede filtrar el tráfico basado en reglas de red y de aplicación.
*   **Azure Web Application Firewall (WAF):** Proporciona protección centralizada para tus aplicaciones web contra vulnerabilidades y exploits comunes de la web (como inyecciones SQL y scripting entre sitios). Se implementa con Azure Application Gateway o Azure Front Door.

#### Azure DDoS Protection
**Azure DDoS Protection** protege tus aplicaciones y recursos de Azure contra ataques de denegación de servicio distribuido (DDoS), que intentan agotar los recursos de una aplicación, haciéndola no disponible para usuarios legítimos. Ofrece dos niveles: Básico (siempre activado) y Estándar (con capacidades mejoradas y monitoreo).

#### Microsoft Sentinel
Anteriormente Azure Sentinel, **Microsoft Sentinel** es una solución SIEM (Security Information and Event Management) y SOAR (Security Orchestration, Automation, and Response) nativa de la nube. Recopila datos de seguridad de diversas fuentes, detecta amenazas utilizando análisis avanzados e inteligencia artificial, investiga incidentes y automatiza respuestas.
\`\`\`kql
// Ejemplo de consulta KQL en Microsoft Sentinel para buscar inicios de sesión fallidos desde IPs sospechosas
SigninLogs
| where ResultType == "50126" // Error code for invalid username or password
| where IPAddress in (ThreatIntelligenceIndicator | where ThreatType == "Botnet" | project NetworkIP)
| summarize count() by IPAddress, UserPrincipalName, TimeGenerated
| order by TimeGenerated desc
\`\`\`

#### Azure Key Vault
**Azure Key Vault** es un servicio en la nube para almacenar y gestionar de forma segura claves criptográficas, secretos (como contraseñas y cadenas de conexión) y certificados SSL/TLS. Ayuda a proteger la información sensible y a cumplir con los requisitos de cumplimiento.

#### Azure Policy y Blueprints
*   **Azure Policy:** Permite crear, asignar y gestionar políticas que aplican reglas y efectos a tus recursos para que cumplan con los estándares corporativos y acuerdos de nivel de nivel de servicio. Por ejemplo, puedes usar una política para asegurar que todas las VMs se implementen en una región específica o que el cifrado de disco esté habilitado.
*   **Azure Blueprints:** Permite definir un conjunto repetible de recursos de Azure que implementan y adhieren a los estándares, patrones y requisitos de una organización. Es una forma de orquestar la implementación de plantillas ARM, políticas, grupos de recursos y asignaciones de roles.

![Diagrama de la arquitectura de ciberseguridad de Azure](/public/images/blue-team/azure-security-architecture.svg)

### Gestión de Costos y Acuerdos de Nivel de Servicio (SLA)
Entiende cómo se gestionan los costos en Azure, las herramientas de monitoreo de gastos y los factores que influyen en el precio. Conoce la importancia de los SLAs y cómo impactan la disponibilidad de los servicios.

*   **Factores que Afectan los Costos de Azure:**
    *   **Tipo de Recurso:** Diferentes servicios tienen diferentes estructuras de precios.
    *   **Uso:** La cantidad de recursos consumidos (ej. horas de VM, GB de almacenamiento, transacciones).
    *   **Ubicación:** Los precios pueden variar ligeramente entre regiones.
    *   **Ancho de Banda de Salida:** El tráfico de datos que sale de Azure suele tener un costo.
    *   **Nivel de Soporte:** Diferentes planes de soporte tienen diferentes costos.
*   **Herramientas de Gestión de Costos:**
    *   **Calculadora de Precios de Azure:** Herramienta online para estimar los costos de los servicios de Azure.
    *   **Azure Cost Management + Billing:** Permite monitorear, asignar y optimizar los costos de la nube.
    *   **Etiquetado de Recursos:** Permite categorizar recursos para un mejor seguimiento de costos y asignación de costos a departamentos o proyectos.
*   **Acuerdos de Nivel de Servicio (SLA):** Un contrato entre Microsoft y el cliente que describe los compromisos de rendimiento y disponibilidad de los servicios de Azure. Si Microsoft no cumple con el SLA, el cliente puede ser elegible para créditos de servicio.
*   **Factores que Afectan el SLA:**
    *   **Zonas de Disponibilidad:** El uso de múltiples zonas de disponibilidad puede aumentar el SLA de una aplicación.
    *   **Redundancia de Datos:** La replicación de datos en múltiples ubicaciones mejora la durabilidad y disponibilidad.
    *   **Diseño de la Aplicación:** Una arquitectura bien diseñada que maneje fallos puede mejorar el SLA efectivo de la aplicación.

## Microsoft SC-900: Security, Compliance, and Identity Fundamentals
La certificación SC-900 se enfoca en los fundamentos de seguridad, cumplimiento e identidad en los servicios de Microsoft, incluyendo Azure y Microsoft 365. Es esencial para cualquier rol de Blue Team que trabaje con tecnologías de Microsoft.

### Conceptos Fundamentales de Seguridad, Cumplimiento e Identidad
Profundiza en los principios de seguridad como Zero Trust, el modelo de responsabilidad compartida en la nube, y los conceptos básicos de cumplimiento y gobernanza.

*   **Principios de Seguridad:**
    *   **Confidencialidad:** Proteger la información del acceso no autorizado.
    *   **Integridad:** Asegurar que la información sea precisa y no haya sido alterada.
    *   **Disponibilidad:** Garantizar que los sistemas y la información estén accesibles cuando se necesiten.
*   **Modelo Zero Trust:** Un enfoque de seguridad que asume que ninguna solicitud es de confianza por defecto, incluso si se origina dentro del perímetro de la red. Requiere verificación explícita para cada acceso.
    *   **Verificar explícitamente:** Autenticar y autorizar siempre, basándose en todos los puntos de datos disponibles.
    *   **Usar acceso con privilegios mínimos:** Limitar el acceso de los usuarios a solo lo que necesitan para su trabajo.
    *   **Asumir la brecha:** Prepararse para que las brechas ocurran y minimizar su impacto.

![Diagrama del Modelo Zero Trust de Microsoft](/public/images/blue-team/zero-trust-model.png)

*   **Modelo de Responsabilidad Compartida (revisado para SC-900):** Reitera que la seguridad es una responsabilidad compartida entre el proveedor de la nube (Microsoft) y el cliente, con la división de responsabilidades variando según el modelo de servicio (IaaS, PaaS, SaaS).
*   **Conceptos de Cumplimiento y Gobernanza:**
    *   **Cumplimiento:** Adherencia a leyes, regulaciones, estándares y políticas internas.
    *   **Gobernanza:** El marco de reglas, prácticas y procesos que aseguran que una organización logre sus objetivos de manera efectiva y ética.
    *   **Privacidad:** Protección de la información personal y sensible.

### Soluciones de Identidad y Acceso de Microsoft
Aprende sobre Azure Active Directory (Azure AD), la gestión de identidades híbridas, la autenticación multifactor (MFA), el inicio de sesión único (SSO) y la gestión de acceso condicional.

*   **Azure Active Directory (Azure AD):** El servicio de gestión de identidades y accesos basado en la nube de Microsoft. Permite a los usuarios iniciar sesión y acceder a recursos internos y externos.
    *   **Usuarios y Grupos:** Gestión de identidades de usuarios y organización en grupos.
    *   **Roles de Azure AD:** Asignación de permisos a usuarios y grupos para gestionar recursos de Azure AD.
*   **Identidades Híbridas:** Sincronización de identidades entre un entorno de Active Directory local y Azure AD, utilizando herramientas como Azure AD Connect.
*   **Autenticación Multifactor (MFA):** Requiere dos o más métodos de verificación para iniciar sesión, añadiendo una capa extra de seguridad.
    *   **Métodos de MFA:** Aplicación Microsoft Authenticator, SMS, llamada telefónica, token de hardware.
*   **Inicio de Sesión Único (SSO):** Permite a los usuarios iniciar sesión una vez y acceder a múltiples aplicaciones y servicios sin tener que volver a introducir sus credenciales.
*   **Acceso Condicional (Conditional Access):** Políticas que evalúan las condiciones de acceso (usuario, dispositivo, ubicación, aplicación) para tomar decisiones de acceso en tiempo real, como requerir MFA o bloquear el acceso.
    \`\`\`text
    Ejemplo de política de Acceso Condicional:
    - Usuarios: Todos los usuarios
    - Aplicaciones en la nube: Todas las aplicaciones en la nube
    - Condiciones: Ubicaciones (Bloquear acceso desde países no aprobados)
    - Concesión: Bloquear acceso
    \`\`\`
*   **Azure AD Identity Protection:** Detecta vulnerabilidades que afectan a las identidades, configura políticas automatizadas para responder a actividades sospechosas y las resuelve.

![Diagrama de flujo de autenticación con Azure AD y MFA](/public/images/blue-team/azure-ad-mfa-flow.png)

### Soluciones de Seguridad de Microsoft
Explora las capacidades de seguridad de Microsoft 365 Defender, Azure Security Center (ahora Microsoft Defender for Cloud), Azure Sentinel (ahora Microsoft Sentinel), y la protección contra amenazas.

*   **Microsoft 365 Defender:** Una suite de seguridad unificada que protege contra amenazas en identidades, puntos finales, datos, aplicaciones y correo electrónico. Incluye:
    *   **Defender for Endpoint:** Protección de puntos finales (dispositivos) contra amenazas avanzadas.
    *   **Defender for Identity:** Protección de identidades híbridas contra ataques basados en identidad.
    *   **Defender for Office 365:** Protección contra amenazas de correo electrónico y colaboración (phishing, malware).
    *   **Defender for Cloud Apps:** Protección de aplicaciones en la nube (CASB - Cloud Access Security Broker).

![Visión general de Microsoft 365 Defender](/public/images/blue-team/microsoft-365-defender-overview.png)

*   **Microsoft Defender for Cloud:** Gestión de la postura de seguridad en la nube (CSPM) y protección de cargas de trabajo en la nube (CWPP) para Azure, entornos híbridos y multinube.
    *   **Puntuación Segura (Secure Score):** Una medida de la postura de seguridad de una organización, con recomendaciones priorizadas para mejorarla.
    *   **Recomendaciones de Seguridad:** Sugerencias accionables para fortalecer la seguridad de tus recursos.
*   **Microsoft Sentinel:** Una solución SIEM (Security Information and Event Management) y SOAR (Security Orchestration, Automation, and Response) nativa de la nube. Recopila datos de seguridad de diversas fuentes, detecta amenazas utilizando análisis avanzados e inteligencia artificial, investiga incidentes y automatiza respuestas.
    \`\`\`kql
    // Ejemplo de consulta KQL en Microsoft Sentinel para buscar inicios de sesión fallidos
    SigninLogs
    | where ResultType == "50126" // Error code for invalid username or password
    | summarize count() by IPAddress, UserPrincipalName
    | order by count_ desc
    \`\`\`

![Arquitectura de Microsoft Sentinel](/public/images/blue-team/microsoft-sentinel-architecture.png)

*   **Azure Firewall:** Servicio de seguridad de red administrado y basado en la nube que protege los recursos de Azure Virtual Network.
*   **Azure DDoS Protection:** Protege las aplicaciones de ataques de denegación de servicio distribuido (DDoS).

### Soluciones de Cumplimiento de Microsoft
Conoce las herramientas y servicios de Microsoft para la gestión del cumplimiento, como Compliance Manager, Data Loss Prevention (DLP), eDiscovery y la gestión de riesgos internos.

*   **Microsoft Purview Compliance Manager:** Una solución basada en la nube que te ayuda a gestionar tu postura de cumplimiento. Proporciona una puntuación de cumplimiento, acciones recomendadas y plantillas para diversas regulaciones.

![Visión general de Microsoft Purview Compliance Manager](/public/images/blue-team/microsoft-purview-compliance-manager.png)

*   **Prevención de Pérdida de Datos (DLP - Data Loss Prevention):** Políticas que identifican, monitorean y protegen la información sensible en Microsoft 365, evitando que se comparta o se filtre de forma no autorizada.
    \`\`\`text
    Ejemplo de política DLP:
    - Detectar números de tarjetas de crédito en documentos de SharePoint y OneDrive.
    - Bloquear el uso compartido externo de documentos que contengan información sensible.
    - Notificar al administrador cuando se detecte una infracción.
    \`\`\`
*   **eDiscovery:** Herramientas para buscar, preservar, recopilar y analizar datos electrónicos para fines legales o de investigación.
    *   **eDiscovery (Standard):s** Funcionalidades básicas de búsqueda y exportación.
    *   **eDiscovery (Premium):** Funcionalidades avanzadas como revisión de documentos, análisis de temas y redacción.
*   **Gestión de Riesgos Internos (Insider Risk Management):** Solución de Microsoft Purview que ayuda a las organizaciones a detectar, investigar y actuar sobre actividades maliciosas o inadvertidas que podrían conducir a una fuga de datos o a otros incidentes de seguridad.
*   **Auditoría de Microsoft 365:** Registra actividades de usuario y administrador en servicios de Microsoft 365 para fines de cumplimiento y forenses.
*   **Retención y Eliminación de Datos:** Políticas para retener datos durante un período específico o eliminarlos después de un tiempo determinado para cumplir con las regulaciones.

## Recursos Adicionales y Próximos Pasos
Para continuar tu aprendizaje en Blue Team y prepararte para estas certificaciones, te recomendamos:
*   Explorar la documentación oficial de Microsoft Learn: [https://learn.microsoft.com/es-es/](https://learn.microsoft.com/es-es/)
*   Realizar laboratorios prácticos en Azure y Microsoft 365 para aplicar los conocimientos teóricos.
*   Participar en comunidades de ciberseguridad defensiva y foros de Microsoft para mantenerte actualizado.
*   Considerar certificaciones más avanzadas como AZ-500 (Azure Security Engineer Associate), SC-200 (Microsoft Security Operations Analyst Associate), SC-300 (Microsoft Identity and Access Administrator Associate) o SC-400 (Microsoft Information Protection Administrator Associate).
`

export default function BlueTeamPage() {
  return (
    <div className="relative flex">
      <div className="container mx-auto px-4 py-8 max-w-3xl flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Masterclass: Introducción al Blue Team</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {blueTeamContent}
        </ReactMarkdown>
      </div>
      <TableOfContents tocItems={tocItems} />
    </div>
  )
}
