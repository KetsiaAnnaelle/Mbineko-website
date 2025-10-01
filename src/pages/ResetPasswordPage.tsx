import { useState, useRef } from 'react';
import Swal from 'sweetalert2';
import { authAPI } from '@/services/api';
// import { useNavigate } from 'react-router';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState<'email' | 'code'>('email');
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<HTMLInputElement[]>([]);

  // Étape 1 : envoi email
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim())
      return Swal.fire('Erreur', 'Veuillez entrer votre email', 'error');

    setIsLoading(true);
    try {
      await authAPI.forgotPassword(email.trim().toLowerCase());
      Swal.fire('Succès', 'Code envoyé à votre email', 'success');
      setStep('code');
    } catch (err: any) {
      Swal.fire(
        'Erreur',
        err.response?.data?.error || 'Impossible d’envoyer le code',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Étape 2 : réinitialisation avec code + mdp
  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const codeValue = code.join('');
    if (codeValue.length !== 4)
      return Swal.fire(
        'Erreur',
        'Veuillez saisir le code à 4 chiffres',
        'error'
      );
    if (!newPassword.trim())
      return Swal.fire(
        'Erreur',
        'Veuillez saisir un nouveau mot de passe',
        'error'
      );

    setIsLoading(true);
    try {
      await authAPI.resetPasswordConfirm(
        email.trim().toLowerCase(),
        codeValue,
        newPassword.trim()
      );
      Swal.fire(
        'Succès',
        'Mot de passe réinitialisé avec succès',
        'success'
      );
      setStep('email');
      setCode(['', '', '', '']);
      setNewPassword('');
      setEmail('');
    } catch (err: any) {
      Swal.fire(
        'Erreur',
        err.response?.data?.error || 'Code invalide ou expiré',
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Gestion du code à 4 chiffres
  const handleCodeChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      // autofocus sur le prochain champ
      if (value && index < inputRefs.current.length - 1) {
        inputRefs.current[index + 1]?.focus();
      }

      // backspace -> focus précédent
      if (!value && index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-lg rounded-2xl p-8">
      {step === 'email' ? (
        <form onSubmit={handleEmailSubmit} className="space-y-6">
          <h2 className="text-xl font-bold">Mot de passe oublié</h2>
          <p className="text-gray-600">
            Entrez votre email pour recevoir un code
          </p>
          <input
            type="email"
            placeholder="Votre email"
            className="w-full border px-4 py-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Envoi...' : 'Envoyer le code'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleResetSubmit} className="space-y-6">
          <h2 className="text-xl font-bold">Réinitialisation</h2>
          <p className="text-gray-600">
            Saisissez le code reçu par email et votre nouveau mot de passe
          </p>

          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                onChange={(e) => handleCodeChange(e.target.value, index)}
                className="w-14 h-14 border-2 border-gray-300 text-center text-xl rounded-lg focus:border-green-600 focus:ring-2 focus:ring-green-600"
              />
            ))}
          </div>

          <input
            type="password"
            placeholder="Nouveau mot de passe"
            className="w-full border px-4 py-3 rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Réinitialisation...' : 'Réinitialiser le mot de passe'}
          </button>
        </form>
      )}
    </div>
  );
}
