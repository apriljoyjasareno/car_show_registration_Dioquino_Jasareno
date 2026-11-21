import type {
  PagedResult,
  PaymentStatus,
  Registration,
  RegistrationQuery,
  RegistrationStatus,
  RegistrationType,
  Summary,
} from "../types";

type Row = [
  string,
  string,
  string,
  RegistrationType,
  RegistrationStatus,
  number,
  number,
];

const rows: Row[] = [
  ["Juan Dela Cruz", "Toyota Supra MK4", "ABC 1234", "Competitor", "Confirmed", 2500, 1000],
  ["Maria Santos", "Honda Civic Type R", "DEF 5678", "Exhibitor", "Confirmed", 1500, 1500],
  ["Pedro Reyes", "Mazda MX-5 Miata", "GHI 9012", "VIP", "CheckedIn", 5000, 5000],
  ["Ana Garcia", "Nissan Skyline GT-R R34", "JKL 3456", "Competitor", "Pending", 2500, 0],
  ["Jose Ramos", "Subaru WRX STI", "MNO 7890", "Competitor", "Confirmed", 2500, 2500],
  ["Liza Mendoza", "Ford Mustang GT", "PQR 1122", "VIP", "Confirmed", 5000, 2500],
  ["Carlo Bautista", "Toyota AE86 Trueno", "STU 3344", "Exhibitor", "CheckedIn", 1500, 1500],
  ["Rhea Villanueva", "Mitsubishi Lancer Evo IX", "VWX 5566", "Competitor", "Cancelled", 2500, 0],
  ["Mark Aquino", "Chevrolet Camaro SS", "YZA 7788", "VIP", "Pending", 5000, 0],
  ["Grace Navarro", "Volkswagen Beetle 1968", "BCD 9900", "Exhibitor", "Confirmed", 1500, 500],
  ["Ramon Castillo", "Honda S2000", "EFG 1357", "Competitor", "CheckedIn", 2500, 2500],
  ["Joy Fernandez", "BMW M3 E46", "HIJ 2468", "VIP", "CheckedIn", 5000, 5000],
  ["Dennis Pascual", "Dodge Charger R/T", "KLM 3579", "Exhibitor", "Pending", 1500, 0],
  ["Cheryl Domingo", "Porsche 911 Carrera", "NOP 4680", "VIP", "Confirmed", 5000, 3000],
  ["Allan Soriano", "Nissan 370Z", "QRS 5791", "Competitor", "Confirmed", 2500, 1250],
  ["Michelle Tan", "Mini Cooper S", "TUV 6802", "Exhibitor", "CheckedIn", 1500, 1500],
  ["Jerome Lim", "Toyota GR86", "WXY 7913", "Competitor", "Pending", 2500, 500],
  ["Katrina Cruz", "Mercedes-Benz 190E", "ZAB 8024", "VIP", "Cancelled", 5000, 0],
  ["Rodel Torres", "Suzuki Jimny", "CDE 9135", "Exhibitor", "Confirmed", 1500, 1500],
  ["Bea Flores", "Mazda RX-7 FD", "FGH 0246", "Competitor", "CheckedIn", 2500, 2500],
  ["Nilo Gonzales", "Ford Ranger Raptor", "IJK 1470", "Exhibitor", "Pending", 1500, 0],
  ["Sheila Rivera", "Lexus LC 500", "LMN 2581", "VIP", "Confirmed", 5000, 5000],
  ["Vincent Dizon", "Honda NSX", "OPQ 3692", "Competitor", "Confirmed", 2500, 0],
  ["Faith Salazar", "Toyota Corolla AE86 Levin", "RST 4703", "Exhibitor", "Cancelled", 1500, 0],
  ["Oscar Javier", "Subaru BRZ", "UVW 5814", "Competitor", "Pending", 2500, 0],
  ["Hannah Cabrera", "Audi TT RS", "XYZ 6925", "VIP", "CheckedIn", 5000, 5000],
];

const cities = ["Sorsogon City", "Naga City", "Legazpi City", "Gubat", "Irosin"];

function getPaymentStatus(fee: number, paid: number): PaymentStatus {
  if (paid <= 0) return "Unpaid";
  if (paid >= fee) return "Paid";
  return "Partial";
}

const registrations: Registration[] = rows.map((r, i) => {
  const [name, car, plate, type, status, fee, paid] = r;
  return {
    id: `sample-${i + 1}`,
    registrationNumber: `CS27-${String(i + 1).padStart(4, "0")}`,
    registrationDate: new Date(
      Date.UTC(2027, 0, 10 + i, 8 + (i % 8), (i * 7) % 60)
    ).toISOString(),
    participantName: name,
    contactNumber: `0917${String(1234500 + i * 111).padStart(7, "0")}`,
    email: `${name.toLowerCase().replace(/ /g, ".")}@example.com`,
    address: `${100 + i} Rizal St., ${cities[i % cities.length]}`,
    carMakeModel: car,
    plateNumber: plate,
    registrationType: type,
    status,
    registrationFee: fee,
    amountPaid: paid,
    paymentStatus: getPaymentStatus(fee, paid),
  };
});

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getRegistrations(
  query: RegistrationQuery
): Promise<PagedResult> {
  await delay(500);

  const search = query.participantName.trim().toLowerCase();
  const filtered = registrations.filter((r) => {
    if (search && !r.participantName.toLowerCase().includes(search)) return false;
    if (query.type && r.registrationType !== query.type) return false;
    if (query.status && r.status !== query.status) return false;
    return true;
  });

  const totalCount = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalCount / query.pageSize));
  const start = (query.page - 1) * query.pageSize;

  return {
    items: filtered.slice(start, start + query.pageSize),
    page: query.page,
    pageSize: query.pageSize,
    totalCount,
    totalPages,
  };
}

export async function getSummary(): Promise<Summary> {
  await delay(300);

  const totalFees = registrations.reduce((sum, r) => sum + r.registrationFee, 0);
  const totalPayments = registrations.reduce((sum, r) => sum + r.amountPaid, 0);

  return {
    totalRegistrations: registrations.length,
    confirmed: registrations.filter((r) => r.status === "Confirmed").length,
    checkedIn: registrations.filter((r) => r.status === "CheckedIn").length,
    pending: registrations.filter((r) => r.status === "Pending").length,
    cancelled: registrations.filter((r) => r.status === "Cancelled").length,
    totalFees,
    totalPayments,
    uncollectedPayments: totalFees - totalPayments,
  };
}