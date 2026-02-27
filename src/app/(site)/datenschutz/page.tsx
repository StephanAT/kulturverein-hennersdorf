import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutz - Kulturverein Hennersdorf",
  description: "Datenschutzerklärung des Gemeinnützigen Hennersdorfer Kulturvereins.",
};

export default function DatenschutzPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Datenschutzerklärung</h1>

      <div className="mt-8 space-y-6 text-sm text-gray-600 leading-relaxed">
        <div>
          <h2 className="text-base font-semibold text-gray-800">Verantwortlicher</h2>
          <p className="mt-2">
            Gemeinnütziger Hennersdorfer Kulturverein<br />
            Josef Postl-Gasse 19, 2332 Hennersdorf<br />
            E-Mail:{" "}
            <a href="mailto:office@kulturverein-hennersdorf.at" className="text-brand hover:underline">
              office@kulturverein-hennersdorf.at
            </a>
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Erhebung und Verarbeitung von Daten</h2>
          <p className="mt-2">
            Diese Website kann grundsätzlich ohne Angabe personenbezogener Daten
            genutzt werden. Beim Besuch der Website werden durch den Hosting-Anbieter
            (Vercel Inc.) automatisch Informationen in Server-Logfiles gespeichert,
            die Ihr Browser übermittelt. Dazu gehören: Browsertyp und -version,
            verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden
            Rechners und Uhrzeit der Serveranfrage. Diese Daten sind nicht
            bestimmten Personen zuordenbar.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Schriftarten</h2>
          <p className="mt-2">
            Diese Website verwendet Google Fonts, die beim Seitenaufruf von
            Servern der Google LLC geladen werden. Dabei wird Ihre IP-Adresse
            an Google übermittelt. Weitere Informationen finden Sie in der{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand hover:underline"
            >
              Datenschutzerklärung von Google
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Cookies</h2>
          <p className="mt-2">
            Diese Website verwendet Cookies. Technisch notwendige Cookies werden
            immer gesetzt. Analyse- und Marketing-Cookies werden nur mit Ihrer
            ausdr&uuml;cklichen Einwilligung aktiviert. Sie k&ouml;nnen Ihre
            Cookie-Einstellungen jederzeit &uuml;ber den Link
            &bdquo;Cookie-Einstellungen&ldquo; im Footer der Website &auml;ndern
            oder widerrufen.
          </p>
          <p className="mt-2">
            <strong>Notwendige Cookies:</strong> Speichern Ihre
            Cookie-Einstellungen (cookie_consent). Laufzeit: 12 Monate.
          </p>
          <p className="mt-2">
            <strong>Statistik-Cookies:</strong> Helfen uns zu verstehen, wie
            Besucher die Website nutzen (z.B. Google Analytics). Werden nur nach
            Einwilligung gesetzt.
          </p>
          <p className="mt-2">
            <strong>Marketing-Cookies:</strong> Werden verwendet, um Werbung
            relevanter zu gestalten. Werden nur nach Einwilligung gesetzt.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Kontaktaufnahme</h2>
          <p className="mt-2">
            Wenn Sie uns per E-Mail kontaktieren, werden Ihre Angaben zur
            Bearbeitung der Anfrage und für mögliche Anschlussfragen gespeichert.
            Diese Daten werden nicht ohne Ihre Einwilligung weitergegeben.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Ihre Rechte</h2>
          <p className="mt-2">
            Gemäß DSGVO haben Sie das Recht auf Auskunft, Berichtigung, Löschung
            und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten.
            Bei Fragen wenden Sie sich an{" "}
            <a href="mailto:office@kulturverein-hennersdorf.at" className="text-brand hover:underline">
              office@kulturverein-hennersdorf.at
            </a>.
          </p>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800">Hosting</h2>
          <p className="mt-2">
            Diese Website wird bei Vercel Inc., 440 N Barranca Ave #4133,
            Covina, CA 91723, USA gehostet. Vercel verarbeitet Daten auch in
            den USA. Die Datenübermittlung in die USA erfolgt auf Grundlage
            des EU-US Data Privacy Framework.
          </p>
        </div>
      </div>
    </div>
  );
}
